const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const oldBundleName = 'templateapp';

// Function to update app name in android/app/build.gradle
function updateBundleNameAndroid(dirname, newBundleId, newAppName) {
  // Step 1: update build.gradle
  const buildGradlePath = path.join(dirname, 'android', 'app', 'build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let content = fs.readFileSync(buildGradlePath, 'utf8');

    // Define regex patterns to find the lines
    const namespaceRegex = /^\s*namespace\s+["'][^"']+["']/gm;
    const applicationIdRegex = /^\s*applicationId\s+["'][^"']+["']/gm;

    // Replace the lines with newBundleId
    content = content.replace(namespaceRegex, `namespace "${newBundleId}"`);
    content = content.replace(
      applicationIdRegex,
      `applicationId "${newBundleId}"`,
    );

    // Write the updated content back to the file
    fs.writeFileSync(buildGradlePath, content, 'utf8');
    console.log(`Updated app name in android/app/build.gradle: ${newBundleId}`);
  } else {
    console.log('android/app/build.gradle not found');
  }

  // Step 2: update MainActivity.kt and MainApplication.kt
  function updateFile(filePath, oldBundleName, newBundleId) {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');

      const lines = content.split(/\r?\n/);

      if (lines.length > 0) {
        lines[0] = `package ${newBundleId}`;

        content = lines.join('\n');

        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated first line in ${filePath}`);
      } else {
        console.log(`${filePath} is empty`);
      }
    } else {
      console.log(`${filePath} not found`);
    }
  }

  const filesToUpdate = [
    path.join(
      dirname,
      'android',
      'app',
      'src',
      'main',
      'java',
      'com',
      // 'DemoApp',
      newAppName.replace(/\s/g, ''),
      'MainActivity.kt',
    ),
    path.join(
      dirname,
      'android',
      'app',
      'src',
      'main',
      'java',
      'com',
      // 'DemoApp',
      newAppName.replace(/\s/g, ''),
      'MainApplication.kt',
    ),
  ];

  filesToUpdate.forEach(filePath =>
    updateFile(filePath, oldBundleName, newBundleId),
  );
}

// Function to update app name in ios/[newname].xcodeproj/project.pbxproj
function updateBundleNameiOS(dirname, newBundleId, newAppName) {
  // Find all directories under ios with .xcodeproj extension
  const iosPath = path.join(
    dirname,
    'ios',
    // 'DemoApp.xcodeproj',
    `${newAppName.replace(/\s/g, '')}.xcodeproj`,
    'project.pbxproj',
  );

  // If the file is 'project.pbxproj', update the specific line
  if (iosPath) {
    let content = fs.readFileSync(iosPath, 'utf8');

    const bundleIdRegex = /PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/g;
    content = content.replace(bundleIdRegex, (match, p1) => {
      if (p1.includes('.dev')) {
        return `PRODUCT_BUNDLE_IDENTIFIER = '${newBundleId}.dev';`;
      } else if (p1.includes('.stage')) {
        return `PRODUCT_BUNDLE_IDENTIFIER = '${newBundleId}.stage';`;
      } else {
        return `PRODUCT_BUNDLE_IDENTIFIER = '${newBundleId}';`;
      }
    });

    fs.writeFileSync(iosPath, content, 'utf8');
    console.log(`Updated bundle name in ${iosPath}`);
  } else {
    console.log('Error updating project.pbxproj');
  }
}

// Function to update main color code
function updateMainColor(mainColor) {
  const filePath = path.join(__dirname, 'src', 'contents', 'colors.js');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the file: ${err}`);
      process.exit(1);
    }

    const updatedData = data.replace(
      /primaryColor:\s*'#[A-Fa-f0-9]{3,6}'(,)?/,
      `primaryColor: '#${mainColor}'$1`, // $1 puts back the optional comma
    );

    fs.writeFile(filePath, updatedData, 'utf8', err => {
      if (err) {
        console.error(`Error writing the file: ${err}`);
        process.exit(1);
      }

      console.log('Main color updated successfully.');
    });
  });
}

// Function to remove sign up screen
function removeSignUpScreen() {
  // Adjust the folder path to point to 'src/screens/loginflow'
  const folderPath = path.join(
    __dirname,
    'src',
    'screens',
    'LoginFlow',
    'SignupScreen',
  );

  // Delete a non-empty folder
  fs.rm(folderPath, { recursive: true, force: true }, err => {
    if (err) {
      console.error(`Error deleting folder: ${err}`);
    }
  });

  const filePath = path.join(__dirname, 'src', 'routes', 'LoginFlow.js');

  // Read the file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Split the content by new lines and filter out lines containing 'SignupScreen'
    const filteredLines = data
      .split('\n')
      .filter(line => !line.includes('SignupScreen'));

    // Join the filtered lines back into a single string
    const updatedContent = filteredLines.join('\n');

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', err => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log('File updated successfully.');
      }
    });
  });

  const screenPath = path.join(
    __dirname,
    'src',
    'screens',
    'LoginFlow',
    'WelcomeScreen',
    'WelcomeScreen.js',
  );

  const contentToRemove = `<TouchableOpacity
            style={styles.signupContainer}
            onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>`;

  // Read the file content
  fs.readFile(screenPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Remove the specified content
    const updatedContent = data.replace(contentToRemove, '');

    // Write the updated content back to the file
    fs.writeFile(screenPath, updatedContent, 'utf8', err => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log('File updated successfully.');
      }
    });
  });
}

// Function to setup Firebase
function setupFirebaseiOS(newAppName) {
  // Step 1: Create Firebase folder and populate with files
  // Define the ios folder path

  const iosFolderPath = path.join(__dirname, 'ios');
  const firebaseFolderPath = path.join(iosFolderPath, 'Firebase');
  const subFolders = ['Dev', 'Prod', 'Stage'];

  // Define the source folder on the desktop
  const sourceFolderPath = path.join(
    require('os').homedir(),
    'Desktop',
    'firebase',
  );

  // Define the mapping of files to subfolders
  const fileMapping = {
    'GoogleService-Info-dev.plist': 'Dev',
    'GoogleService-Info-stage.plist': 'Stage',
    'GoogleService-Info.plist': 'Prod', // Adjusted for the production file name
  };

  try {
    // Create Firebase folder
    if (!fs.existsSync(firebaseFolderPath)) {
      fs.mkdirSync(firebaseFolderPath, { recursive: true });
      console.log(`Created folder: ${firebaseFolderPath}`);
    }

    // Create subfolders (Dev, Prod, Stage) inside Firebase folder
    subFolders.forEach(folder => {
      const folderPath = path.join(firebaseFolderPath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
      }
    });

    // Copy files to respective subfolders
    Object.keys(fileMapping).forEach(fileName => {
      const srcFilePath = path.join(sourceFolderPath, fileName);
      const destFolderPath = path.join(
        firebaseFolderPath,
        fileMapping[fileName],
      );
      const destFilePath = path.join(destFolderPath, fileName);

      if (fs.existsSync(srcFilePath)) {
        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`Copied ${fileName} to ${destFolderPath}`);
      } else {
        console.warn(`Source file ${srcFilePath} does not exist`);
      }
    });

    // Copy the GoogleService-Info.plist to the ios folder
    const productionFilePath = path.join(
      sourceFolderPath,
      'GoogleService-Info.plist',
    );
    const iosDestinationPath = path.join(
      iosFolderPath,
      'GoogleService-Info.plist',
    );
    if (fs.existsSync(productionFilePath)) {
      fs.copyFileSync(productionFilePath, iosDestinationPath);
      console.log(`Copied GoogleService-Info.plist to ${iosFolderPath}`);
    } else {
      console.warn(`Source file ${productionFilePath} does not exist`);
    }
  } catch (err) {
    console.error('Error setting up Firebase:', err);
  }

  // Step 2: Setup Firebase in AppDelegate.swift
  const appDelegatePath = path.join(
    __dirname,
    'ios',
    // 'DemoApp',
    newAppName.replace(/\s/g, ''),
    'AppDelegate.swift',
  );
  const importFirebaseLine = 'import Firebase';
  const configureFirebaseLine = 'FirebaseApp.configure()';

  try {
    // Read the AppDelegate.swift file
    let content = fs.readFileSync(appDelegatePath, 'utf8');

    // Check if import Firebase already exists
    if (!content.includes(importFirebaseLine)) {
      // Insert import Firebaseafter #import "AppDelegate.h"
      if (!content.includes(importFirebaseLine)) {
        content = `${importFirebaseLine}\n${content}`;
      }
      console.log(`Added ${importFirebaseLine} to AppDelegate.swift`);
    } else {
      console.log(`${importFirebaseLine} already present in AppDelegate.swift`);
    }

    // Check if FirebaseApp.configure() already exists
    if (!content.includes(configureFirebaseLine)) {
      // Insert FirebaseApp.configure() before self.moduleName
      content = content.replace(
        'self.moduleName',
        `${configureFirebaseLine}\nself.moduleName`,
      );
      console.log(`Added ${configureFirebaseLine} to AppDelegate.swift`);
    } else {
      console.log(
        `${configureFirebaseLine} already present in AppDelegate.swift`,
      );
    }

    // Write the updated content back to the file
    fs.writeFileSync(appDelegatePath, content, 'utf8');
    console.log('AppDelegate.swift updated successfully.');
  } catch (err) {
    console.error('Error setting up Firebase in AppDelegate.swift:', err);
  }

  // Step 3: Setup Firebase in Podfile

  const podfilePath = path.join(__dirname, 'ios', 'Podfile');
  const linesToInsert = [
    'use_frameworks! :linkage => :static',
    '$RNFirebaseAsStaticFramework = true',
  ];

  // Regex to match and replace the linkage block
  const linkageBlockRegex =
    /linkage = ENV\[['"]USE_FRAMEWORKS['"]\][\s\S]*?use_frameworks!\s*:linkage\s*=>\s*linkage\.to_sym\s*end/g;

  try {
    // Read the Podfile
    let content = fs.readFileSync(podfilePath, 'utf8');

    // Replace the existing linkage block with the new Firebase setup lines
    const newBlock = linesToInsert.join('\n');
    if (!linkageBlockRegex.test(content)) {
      throw new Error('Linkage block not found in Podfile.');
    }

    content = content.replace(linkageBlockRegex, newBlock);

    console.log('Updated Podfile: Replaced linkage block with Firebase setup.');

    // Write the updated content back to the file
    fs.writeFileSync(podfilePath, content, 'utf8');
    console.log('Podfile updated successfully.');
  } catch (err) {
    console.error('Error setting up Firebase in Podfile:', err);
  }

  //Step 4: Setup Firebase in package.json

  const firebasePackage = '@react-native-firebase/app@20.1.0';

  exec(
    `npm install --save ${firebasePackage} --legacy-peer-deps`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing ${firebasePackage}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        // optional: don't return here if stderr includes only warnings
      }
      console.log(
        `Installed ${firebasePackage} successfully with legacy peer deps.`,
      );
    },
  );
}

function toSetupFirebaseAndroid() {
  //Step 1: Copy google-services.json file into app folder
  const appFolderPath = path.join(__dirname, 'android', 'app');

  // Define the source folder on the desktop
  const sourceFolderPath = path.join(
    require('os').homedir(),
    'Desktop',
    'firebase',
  );

  // Copy the GoogleService-Info.plist to the ios folder
  const productionFilePath = path.join(
    sourceFolderPath,
    'google-services.json',
  );
  const iosDestinationPath = path.join(appFolderPath, 'google-services.json');
  if (fs.existsSync(productionFilePath)) {
    fs.copyFileSync(productionFilePath, iosDestinationPath);
    console.log(`Copied google-services.json to ${appFolderPath}`);
  } else {
    console.warn(`Source file ${productionFilePath} does not exist`);
  }

  //Step 2: Update build.gradle file
  const buildGradlePath = path.join(__dirname, 'android', 'build.gradle');

  if (fs.existsSync(buildGradlePath)) {
    let content = fs.readFileSync(buildGradlePath, 'utf8');

    // Define regex patterns to find the line
    const classPath = 'classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")';
    const firebaseClasspath =
      "classpath 'com.google.gms:google-services:4.4.2'";

    // Replace the line with classPath
    const lines = content.split('\n');

    const insertAfterIndex = lines.findIndex(line => line.includes(classPath));

    if (insertAfterIndex !== -1) {
      // Insert the new line after the found line
      lines.splice(insertAfterIndex + 1, 0, firebaseClasspath);
    } else {
      console.log(`Line '${classPath}' not found in build.gradle`);
      return;
    }

    // Join lines back into a single string with newline characters
    content = lines.join('\n');

    // Write the updated content back to the file
    fs.writeFileSync(buildGradlePath, content, 'utf8');
    console.log(
      `Inserted '${classPath}'${firebaseClasspath} in ${buildGradlePath}`,
    );
  } else {
    console.log('android/build.gradle not found');
  }

  //Step 3: Update app/build.gradle file
  const buildAppGradlePath = path.join(
    __dirname,
    'android',
    'app',
    'build.gradle',
  );

  if (fs.existsSync(buildAppGradlePath)) {
    let content = fs.readFileSync(buildAppGradlePath, 'utf8');

    const lines = content.split('\n');

    const firebaseGoogleServices =
      "apply plugin: 'com.google.gms.google-services'";

    // Insert the new line after the specified line number (1-based index)
    lines.splice(1, 0, firebaseGoogleServices);

    // Join lines back into a single string with newline characters
    content = lines.join('\n');

    // Write the updated content back to the file
    fs.writeFileSync(buildAppGradlePath, content, 'utf8');
    console.log(
      `Inserted '${firebaseGoogleServices}' in ${buildAppGradlePath}`,
    );
  } else {
    console.log('android/app/build.gradle not found');
  }
}

module.exports = {
  updateBundleNameAndroid,
  updateBundleNameiOS,
  updateMainColor,
  removeSignUpScreen,
  setupFirebaseiOS,
  toSetupFirebaseAndroid,
};

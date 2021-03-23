# Tag-It
A browser extension built for BSc. Computer Science CM2020 Agile Software Projects

#### Installation

Instructions below are created for development and testing with the Chrome browser:

1. Click on the 3 dots on the Chrome browser's address bar, top-right. Select More Tools > Extensions
2. Enable **Developer mode** on the top right corner of the Extension Manager
3. Click on "Load Unpacked" on the top left
4. Select the "Tag-It" folder (the folder where this README file is situated)
5. The plugin should appear on the list of lugins
6. Click on the browser's 'jigsaw' icon beside the address toolbar
7. Pin Tag-It to the extension bar. The pin icon should turn blue.
8. When you open a new tab, you might see the following warning. Please press “Keep it”. Your original settings will be restored after removing the plugin.
9. You should see the plugin icon on your browser if you have successfully loaded the plugin!

##### REMOVAL
After testing the plugin, it can be removed by clicking remove in the extension manager. You can get to the extension manager by typing “chrome://extensions/” (without quotes) in the address bar.

#### Running Tests

Utility modules and localforage (DB) methods have test coverage and can be run with the following instructions:

1. install NodeJS and npm/yarn 
2. run `npm install` in the root directory
3. run `yarn test` or `npm test`, depending on the package manage installed.

#### Known Issues

Browser API methods are difficult to test and documentation on the process was scattered and years old.

These APIs are not tested but instead underwent Business Logic testing 

#### Documentation

Chrome documentation: https://developer.chrome.com/docs/extensions/mv3/getstarted/

#### Credits and References

1. Ajith Abraham https://github.com/ajithkabraham
2. Anil Ganireddy https://github.com/anilganireddy
3. Simon Horton https://github.com/SimonH1821
4. Winfred Selwyn Ooh https://github.com/saintograph
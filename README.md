# [Unity SystemInfo Table](https://mvi.github.io/UnitySystemInfoTable/)

Crowdsourced [table](https://mvi.github.io/UnitySystemInfoTable/) of system capabilities from different devices

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com) [![GitHub](https://img.shields.io/github/license/mvi/UnitySystemInfoTable)](https://github.com/mvi/UnitySystemInfoTable/blob/master/LICENSE)

Unity provides the [SystemInfo](https://docs.unity3d.com/ScriptReference/SystemInfo.html) API which allows you to find out the capabilities of the device you're running on. Knowing which devices support what is important when making technical decisions about what you can use on your target devices on new projects.

The Unity SystemInfo Table project is intended to allow Unity developers to contribute to a shared table so we can map out what common devices support.

## How to contribute

1. Download the [CopySystemInfo](https://github.com/mvi/UnitySystemInfoTable/blob/main/CopySystemInfo.cs) MonoBehaviour into a Unity project (ideally on a relatively new Unity version)
2. Add CopySystemInfo to a game object in a scene that gets built
3. Build and run the project on your target device
4. There are now two options:
    1. On Desktop or Mobile, the SystemInfo json text is automatically copied to the clipboard
    2. On all platforms, the SystemInfo json will be written to the console log
5. Create a new .json file and paste in the SystemInfo json
6. Double check that the json file is valid and contains no personal information (the copy code automatically removes device name and unique identfier, but you may want to double check)
7. Create a pull request with your json file in the /input folder

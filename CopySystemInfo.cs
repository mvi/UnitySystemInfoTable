using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;

/// <summary>
/// Add this to a game object and then build and run the game on device to automatically generate a JSON file that is
/// copied to clipboard containing the system information for the target device. 
/// </summary>
public class CopySystemInfo : MonoBehaviour
{
    void Start()
    {
        // Exclude any values that contain non-anonymous values
        string[] excludedValues = {"deviceUniqueIdentifier", "deviceName"};

        Dictionary<string, object> mappings = new Dictionary<string, object>();

        // Include Unity version and platform so we can version the data correctly
        mappings["unityVersion"] = Application.unityVersion;
        mappings["unityPlatform"] = Application.platform.ToString();

        PropertyInfo[] properties = typeof(SystemInfo).GetProperties();
        foreach (PropertyInfo propertyInfo in properties)
        {
            // Get the value for the property, of it's one that contains identifiable data REDACT it instead
            object value = excludedValues.Contains(propertyInfo.Name) ? "REDACTED" : propertyInfo.GetValue(null);

            mappings[propertyInfo.Name] = value;
        }

        string ConvertToJSONLine(KeyValuePair<string, object> mapping)
        {
            if (mapping.Value is bool)
            {
                return $"    \"{mapping.Key}\": {mapping.Value.ToString().ToLower()}";
            }

            if (mapping.Value is int)
            {
                return $"    \"{mapping.Key}\": {mapping.Value}";
            }

            return $"    \"{mapping.Key}\": \"{mapping.Value}\"";
        }

        string json = "{\n" + string.Join(",\n", mappings.Select(ConvertToJSONLine)) + "\n}";

        GUIUtility.systemCopyBuffer = json;

        Debug.Log(json);
    }
}

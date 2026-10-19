package ge.sidekick.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Tells the dashboard whether this build can receive push notifications.
 *
 * Android push goes through Firebase, which is set up by
 * android/app/google-services.json. A build made without that file has no
 * Firebase, and asking the PushNotifications plugin to register would crash
 * the app — every launch, once the person has allowed notifications. The
 * dashboard (~/SideKick lib/app/push.ts) asks here first.
 */
@CapacitorPlugin(name = "SidekickApp")
public class SidekickAppPlugin extends Plugin {

    @PluginMethod
    public void pushReady(PluginCall call) {
        // The google-services Gradle plugin turns google-services.json into
        // this string resource; without the file it does not exist.
        int id = getContext().getResources().getIdentifier("google_app_id", "string", getContext().getPackageName());
        JSObject result = new JSObject();
        result.put("ready", id != 0);
        call.resolve(result);
    }
}

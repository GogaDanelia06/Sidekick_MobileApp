package ge.sidekick.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Our own small plugin; must be registered before the bridge starts.
        registerPlugin(SidekickAppPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

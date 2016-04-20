package com.reactnativesharing;

import android.content.ActivityNotFoundException;
import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class Sharer extends ReactContextBaseJavaModule
{
    private static final String REACT_CLASS_NAME = "Sharer";
    private static final String KEY_SUBJECT = "share_text";
    private static final String KEY_TEXT = "share_URL";
    private static final String KEY_TITLE = "title";
    private ReactApplicationContext context;

    public Sharer(ReactApplicationContext context)
    {
        super(context);
        this.context = context;
    }

    @Override
    public String getName()
    {
        return REACT_CLASS_NAME;
    }

    /**
     * Shares the {link Content} to the Android system.
     * If there are applicationsToExclude, then the Android system will be told to disable sharing to those applications.
     */
    @ReactMethod
    public void share(ReadableMap options, Promise promise)
    {
        String subject = options.getString(KEY_SUBJECT);
        String text = options.getString(KEY_TEXT);
        String title = options.getString(KEY_TITLE);

        Intent shareIntent = new ShareIntent(subject, text, "text/plain");

        Intent chooserIntent = Intent.createChooser(shareIntent, title);
        chooserIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        try
        {
            this.context.startActivity(chooserIntent);
        }
        catch (ActivityNotFoundException exception)
        {
            promise.reject(exception);
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants()
    {
        HashMap<String, Object> constants = new HashMap<String, Object>();
        constants.put("KEY_SUBJECT", KEY_SUBJECT);
        constants.put("KEY_TEXT", KEY_TEXT);
        constants.put("KEY_TITLE", KEY_TITLE);

        return constants;
    }

}
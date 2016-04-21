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
    private static final String KEY_CHOOSER_TITLE = "chooser_title";
    private static final String KEY_SUBJECT = "subject";
    private static final String KEY_MESSAGE = "message";
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
        String chooserTitle = options.getString(KEY_CHOOSER_TITLE);
        String subject = options.getString(KEY_SUBJECT);
        String message = options.getString(KEY_MESSAGE);

        Intent shareIntent = getShareIntent(subject, message, "text/plain");

        Intent chooserIntent = Intent.createChooser(shareIntent, chooserTitle);
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

    private Intent getShareIntent(String subject, String text, String type)
    {
        Intent intent = new Intent(android.content.Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_SUBJECT, subject);
        intent.putExtra(Intent.EXTRA_TEXT, text);
        intent.setType(type);

        return intent;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants()
    {
        HashMap<String, Object> constants = new HashMap<String, Object>();
        constants.put("KEY_CHOOSER_TITLE", KEY_CHOOSER_TITLE);
        constants.put("KEY_SUBJECT", KEY_SUBJECT);
        constants.put("KEY_MESSAGE", KEY_MESSAGE);

        return constants;
    }

}
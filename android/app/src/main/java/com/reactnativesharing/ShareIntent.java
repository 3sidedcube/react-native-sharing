package com.reactnativesharing;

import android.content.Intent;

import com.facebook.react.bridge.ReadableMap;

/**
 * Created by jamiecruwys on 20/04/16.
 */
public class ShareIntent extends Intent
{
    public ShareIntent(String subject, String text, String type)
    {
        this.setAction(android.content.Intent.ACTION_SEND);
        this.putExtra(Intent.EXTRA_SUBJECT, subject);
        this.putExtra(Intent.EXTRA_TEXT, text);
        this.setType(type);
    }
}
##Summary
MessageDialog displays a simple dialog that can be customized with text and buttons (with handlers for each button click).

* <a href="#wiki-basicUsage">**Basic Usage**</a>
* <a href="#wiki-options">**Options**</a>
* <a href="#wiki-methods">**Methods**</a>

## <a name="basicUsage"></a>Basic usage

If loaded as a standalone script (meaning the MessageDialog script is loaded via a `<script>` tag and an AMD loader is not present on the page), a MessageDialog object can be instantiated like this:
```javascript
var errorMessage = new MessageDialog({
                              title:    'Error',
                              message:  'My error message',
                              dialogId: 'dialog-alert-error',
                              buttons: {
                                  'OK': function () {
                                      $( this ).tritondialog( "close" );
                                  }
                              }
                            });
```

The MessageDialog can also be loaded via an AMD loader (e.g. RequireJS). Once loaded, the MessageDialog reference can be used to create an instance of a customized dialog like this:

```javascript
define([
    'components/MessageDialog'
    ],

    function ( MessageDialog ) {

        var errorMessage = new MessageDialog({
                              title:    'Error',
                              message:  'My error message',
                              dialogId: 'dialog-alert-error',
                              buttons: {
                                  'OK': function () {
                                      $( this ).MessageDialog( "close" );
                                  }
                              }
                            });

    });
```

You can toggle the dialog to open with the `show` method like this:
```javascript
errorMessage.show();
```
And then you can close this dialog programmatically with the `hide` method like this:
```javascript
errorMessage.hide();
```

## <a name="options"></a>Options

These options can be defined in the constructor upon the creation of a MessageDialog object, or set using the `set()` method after a MessageDialog object is instantiated.

|Option|Type|Default|Description|
|------|----|-------|-----------|
|title|string|""|The title displayed at the top of the dialog box.|
|message|string|""|The message displayed inside the dialog box.|
|dialogId|string|"triton-dialog-" + random number 1-100|The id of the container <div> in the dialog box.|
|buttons|function|{'OK': function () { $( this ).tritondialog( "close" );}}|The list of buttons to be displayed in the dialog box as well as their click handlers.|

## <a name="methods"></a>Methods

####Constructor

Takes in any of the described <a href="#wiki-options">options</a> as input and returns a new instance of a MessageDialog.

```javascript
var errorMessage = new MessageDialog({
                              title:    'Error',
                              message:  'My error message',
                              dialogId: 'dialog-alert-error',
                              buttons: {
                                  'OK': function () {
                                      $( this ).MessageDialog( "close" );
                                  }
                              }
                            });
```

####show()

Opens the dialog modal.

```javascript
errorMessage.show();
```

####hide()

Closes the dialog modal.

```javascript
errorMessage.hide();
```
####set()

Sets one or more options in the MessageDialog object.
```javascript
// Changes the title to 'Hello'
var title = 'Hello';
errorMessage.set('title', title);

// Can also change multiple options at one time
errorMessage.set({
    title: 'Hello',
    message: 'New message'
});
```

####get()

Returns the value of an option
```javascript
// Returns the value of 'title'
errorMessage.get('title');
```

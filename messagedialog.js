(function ( root, factory ) {

    if( typeof define === 'function' && define.amd ) {
        // AMD
        define( ['jquery',
                 'underscore',
                 'components/basic-class',
                 'widgets/jquery.ui.tritondialog'],
                 factory );
    } else {
        // Browser globals
        root.ProgressBar = factory( root.$, root._, root.BasicClass );
    }

}( this, function( $, _, BasicClass ) {

  var error = function( msg ) { throw new Error(msg); };

  // Return a constructor for the TritonDialog object
  var TritonDialog = function () {

    // Make sure that the 'new' keyword is not left out when instantiating a new object. If the 'new' keyword is left
    // out, the 'this' keyword will be set to the global context rather than the TritonDialog context, so we check the
    // value of 'this' to ensure that 'new' was used.
    if( !(this instanceof TritonDialog) ) {
      error('cannot instantiate TritonDialog without using the "new" keyword');
    }

    // Need at least one argument
    if (arguments[0] === undefined) {
      error('constructor requires at least one argument');
    }

    // Don't want undefined parameters running around, so we define default parameters here
    var defaultParams = {
      title:    "",
      message:  "",
      dialogId: "triton-dialog-" + ( Math.floor( Math.random() * 100 ) + 1 ),
      buttons: {
        'OK': function () {
            $( this ).tritondialog( "close" );
        }
      }
    };

    // We want a deep copy of the defaultParams object, so we achieve that with the 'extend' function provided by
    // underscore
    _.extend( this, defaultParams );

    switch (typeof arguments[0]) {

      case 'string':
        this.message = arguments[0];

        break;

      case 'object':
        // If an empty string is passed in for title, we don't want to overwrite it with defaultParams
        this.title    = arguments[0].title === "" ? "" : arguments[0].title || defaultParams.title;
        this.message  = arguments[0].message  || defaultParams.message;
        this.dialogId = arguments[0].dialogId || defaultParams.dialogId;
        this.buttons  = arguments[0].buttons  || defaultParams.buttons;

        break;

      default:
        error('unexpected type of argument: expected "string" or "object", received ' + typeof arguments[0]);
    }

    // Create the markup for the dialog and add it to the document
    var div     = document.createElement( 'DIV' );
    var p       = document.createElement( 'p' );
    var message = document.createTextNode( this.message );

    // Link the nodes together
    p.appendChild(message);
    div.appendChild(p);

    // All attributes are set on the div container for simplicity
    div.setAttribute( 'style', 'display:none' );
    div.setAttribute( 'title', this.title );
    div.setAttribute( 'id',    this.dialogId );

    // Append the markup to the document body
    document.body.appendChild(div);
  };

  // Set up inheritance from BasicClass so that it's functions will be available to anything using TritonDialog
  TritonDialog.prototype = Object.create(BasicClass.prototype);

  // But we still want to use the TritonDialog constructor, not the BasicClass constructor. We can call the BasicClass
  // constructor from within the TritonDialog constructor if we want.
  TritonDialog.prototype.constructor = TritonDialog;

  TritonDialog.prototype.show = function () {

    if ( this.dialogId.charAt(0) !== '#' ) {
      this.dialogId = '#' + this.dialogId;
    }

    var $dialog = $( this.dialogId );

    $dialog.tritondialog({
        buttons: this.buttons
    });
  };

  TritonDialog.prototype.hide = function () {

    // Just close the dialog box. Won't do anything if it's already closed.
    $( this ).tritondialog( "close" );
  };

  return TritonDialog;
}));

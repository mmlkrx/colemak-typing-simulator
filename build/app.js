var TextBox = React.createClass({displayName: "TextBox",
  render: function() {
    return (
      React.createElement("div", {className: "text-box", id: this.props.id}, 
        React.createElement("textarea", {placeholder: this.props.placeholder, onChange: this.props.callback, value: this.props.transformedColemakTranslation})
      )
    );
  }
});

var TranslationBox = React.createClass({displayName: "TranslationBox",
  render: function() {
    return (
      React.createElement("div", {className: "translation-box"}, 
        this.props.colemakTranslation
      )
    );
  }
});

var BoxContainer = React.createClass({displayName: "BoxContainer",
  getInitialState: function() {
    return {translatedText: '', transformedText: ''}
  },

  getDefaultProps: function() {
    return {
      qwerty: 'qwertyuiopasdfghjkl;zxcvbnmQWERTYUIOPASDFGHJKL:ZXCVBNM',
      colemak: 'qwksfoil;radgethynupzxcvbjmQWKSFOIL;RADGETHYNUPZXCVBJM'
    };
  },

  validLetter: function(char) {
    return this.props.qwerty.indexOf(char) >= 0;
  },

  translateInputToColemak: function(e) {
    var targetValue = e.target.value;
    this.setState({translatedText: this.translateText(targetValue, 'qwerty', 'colemak')});
  },

  translateText: function(text, from, to) {
    switch (from) {
      case 'colemak':
        from = this.props.colemak;
        to = this.props.qwerty;
        break;
      case 'qwerty':
        from = this.props.qwerty;
        to = this.props.colemak;
        break;
    }

    var translatedText = '';
    for (var i = 0; i < text.length; i++) {
      translatedText += (this.validLetter(text.charAt(i)) ? to.charAt(from.indexOf(text.charAt(i))) : text.charAt(i));
    }
    return translatedText;
  },

  transformColemakTranslation: function(e) {
    var targetValue = e.target.value;
    var transformedText = this.state.transformedText;
    var userAddedText = targetValue.length > transformedText.length;
    var userDeletedText = targetValue.length < transformedText.length;

    if (userDeletedText) {
      this.setState({transformedText: transformedText.substring(0, targetValue.length)})
    } else if (userAddedText) {
      var simpleDifference = targetValue.substring(transformedText.length, targetValue.length)
      this.setState({transformedText: transformedText + this.translateText(simpleDifference, 'colemak', 'qwerty')})
    }
  },

  render: function() {
    var inputLabelText = ''
    return (
      React.createElement("div", {className: "box-container"}, 
        React.createElement("h1", {id: "title"}, "Colemak Typing Simulator"), 
        React.createElement(TextBox, {placeholder: "Please enter your text...", callback: this.translateInputToColemak, id: "input"}), 
        React.createElement(TranslationBox, {colemakTranslation: this.state.translatedText}), 
        React.createElement(TextBox, {placeholder: "Type here to see the magic happen...", callback: this.transformColemakTranslation, transformedColemakTranslation: this.state.transformedText, id: "output"})
      )
    );
  }
});

React.render(React.createElement(BoxContainer, null), document.getElementById('content'));

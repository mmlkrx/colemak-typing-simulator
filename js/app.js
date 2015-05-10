var TextBox = React.createClass({
  render: function() {
    return (
      <div className="text-box" id={this.props.id} >
        <textarea placeholder={this.props.placeholder} onChange={this.props.callback} value={this.props.transformedColemakTranslation} />
      </div>
    );
  }
});

var TranslationBox = React.createClass({
  render: function() {
    return (
      <div className="translation-box">
        {this.props.colemakTranslation}
      </div>
    );
  }
});

var BoxContainer = React.createClass({
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
      <div className="box-container">
        <h1 id="title">Colemak Typing Simulator</h1>
        <TextBox placeholder="Please enter your text..." callback={this.translateInputToColemak} id="input"/>
        <TranslationBox colemakTranslation={this.state.translatedText} />
        <TextBox placeholder="Type here to see the magic happen..." callback={this.transformColemakTranslation} transformedColemakTranslation={this.state.transformedText} id="output" />
      </div>
    );
  }
});

React.render(<BoxContainer />, document.getElementById('content'));

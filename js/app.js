var TextBox = React.createClass({
    render: function() {
        return (
            <div className="text-box">
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
        return {inputText: '', outputText: ''}
    },

    getDefaultProps: function() {
        return {
            qwerty: 'qwertyuiopasdfghjkl;zxcvbnmQWERTYUIOPASDFGHJKL:ZXCVBNM',
            colemak: 'qwfpgjluy;arstdhneiozxcvbkmQWFPGJLUY:ARSTDHNEIOZXCVBKM',
            colerty: 'qwksfoil;radgethynupzxcvbjmQWKSFOIL;RADGETHYNUPZXCVBJM'
        };
    },

    translateInputToColemak: function(e) {
        var qwerty  = this.props.qwerty;
        var colerty = this.props.colerty;
        var rawValue = e.target.value;
        var translatedColemak = '';

        for(var i = 0; i < rawValue.length; i++) {
            translatedColemak += (qwerty.indexOf(rawValue.charAt(i)) >= 0 ? colerty.charAt(qwerty.indexOf(rawValue.charAt(i))) : rawValue.charAt(i));
        }
        this.setState({inputText: translatedColemak});
    },

    transformColemakTranslation: function(e) {
        var qwerty  = this.props.qwerty;
        var colemak = this.props.colemak;
        var rawValue = e.target.value;
        var outputText = this.state.outputText;
        var userHitBackspace = rawValue.length > this.state.outputText.length;

        if (userHitBackspace) {
            var rawChar = rawValue.charAt(rawValue.length - 1);
            var colertyValue = qwerty.indexOf(rawChar) >= 0 ? colemak.charAt(qwerty.indexOf(rawChar)) : rawChar;
            this.setState({outputText: outputText + colertyValue});
        } else {
            this.setState({outputText: outputText.substring(0, (outputText.length -1))});
        }
    },

    render: function() {
        return (
            <div className="box-container">
                <h2>Colemak Typing Simulator</h2>
                <TextBox placeholder="Please enter your text..." callback={this.translateInputToColemak} />
                <TranslationBox colemakTranslation={this.state.inputText} />
                <TextBox placeholder="Type here to see the magic happen..." callback={this.transformColemakTranslation} transformedColemakTranslation={this.state.outputText} />
            </div>
        );
    }
});

React.render(<BoxContainer />, document.getElementById('content'));

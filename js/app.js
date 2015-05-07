var TextBox = React.createClass({
    render: function() {
        return (
            <div className="text-box">
                <input type="text" placeholder="Please enter your text..." onChange={this.props.callback} value={this.props.transformedColemakTranslation} />
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

    translateInputToColemak: function() {
        var qwerty  = this.props.qwerty;
        var colerty = this.props.colerty;
        var rawValue = e.target.value;
        var translatedColemak = '';

        for(var i = 0; i < rawValue.length; i++) {
            translatedColemak += (qwerty.indexOf(rawValue.charAt(i)) >= 0 ? colerty.charAt(qwerty.indexOf(rawValue.charAt(i))) : rawValue.charAt(i));
        }
        this.setState({inputText: translatedColemak});
    },

    transformColemakTranslation: function() {
        //Do more stuff
    },

    render: function() {
        return (
            <div className="box-container">
                <TextBox placeholder="Please enter your text..." callback={this.translateInputToColemak} />
                <TranslationBox colemakTranslation={this.state.inputText} />
                <TextBox placeholder="Type here to see the magic happen..." callback={this.transformColemakTranslation} transformedColemakTranslation={this.state.outputText} />
            </div>
        );
    }
});

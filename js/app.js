var TextBox = React.createClass({
    render: function() {
        return (
            <div className="text-box input-box">
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

    translateInputToColemak: function() {
        //Do stuff
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

import React from 'react';
import {compose} from "redux";
import { connect } from 'react-redux';

const i18n = (Translateable) => {

    class Translator extends React.Component {
        constructor(props) {
            super(props);
            this._i18n = this.i18n.bind(this);
        }

        i18n(key) {
            const target = this.props.data.filter(item => item.lang === this.props.activeLanguage);
            
            if (target[0] && target[0][key]) {
                return target[0][key];
            }

            return null;
        }

        render() {
            return <Translateable i18n={this._i18n} />;
        }
    }

    const mapStateToProps = ({ language }) => {
        return {
            data: language.data,
            activeLanguage: language.activeLanguage
        };
    }

    return connect(mapStateToProps)(Translator);

}


export default i18n;
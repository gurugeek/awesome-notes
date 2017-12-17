import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { NotesStyle } from '../styles/index';
import { notes } from '../selectors/notes';
import { goto } from '../actions/navigation';
import EmptyNotes from '../components/Notes/EmptyNotes';
import HeaderButton from '../components/common/HeaderButton';

class Notes extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        const gotoCreateNote = state.params && state.params.gotoCreateNote ? state.params.gotoCreateNote : null;
        return {
            title: 'Notes',
            headerRight: <HeaderButton action={gotoCreateNote} type='plus' />
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({
            gotoCreateNote: this.props.gotoCreateNote
        });
    }

    renderNotes() {
        console.log(this.props.notes);
        return this.props.notes.length > 0 ? <View /> : <EmptyNotes gotoCreateNote={this.props.gotoCreateNote} />;
    }

    render() {
        return (
            <View style={NotesStyle.container}>
                {this.renderNotes()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        notes: notes(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        gotoCreateNote: () => {
            dispatch(goto('CreateNote'));
        }
    });
};

Notes.propTypes = {
    notes: PropTypes.array.isRequired,
    gotoCreateNote: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
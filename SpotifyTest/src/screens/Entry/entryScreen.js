/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
//Authentication handler
import authHandler from '../../utils/authHandler';

//Redux imports
import { connect } from 'react-redux';
import {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
} from '../../redux/features/authentication/authenticationSlice';

//Navigations
import LoggedIn from '../LoggedIn/loggedIn';
import { createStackNavigator } from '@react-navigation/stack'
import GuestNavigation from '../../navigation/guestNavigation';

const Stack = createStackNavigator()

class EntryScreen extends Component {

    componentDidUpdate(prevProps) {
        // console.log(this.state);
        console.log(this.props);
        console.log(prevProps)
        if (
            this.props.refreshToken !== prevProps.refreshToken &&
            !this.props.accessToken
        ) {
            console.log('mahima');
            this.tryAutoLogin();
        }
        if (this.props.accessToken !== prevProps.accessToken) {
            this.props.setLoadingFalse();
            console.log('navoneel')
        }
    }

    tryAutoLogin = async () => {
        console.log('sid');
        this.props.setLoadingTrue();
        try {
            const authenticationObject = await authHandler.refreshLogin(
                this.props.refreshToken
            );
            this.props.setAccessToken({
                accessToken: authenticationObject.accessToken,
            });
            this.props.setRefreshToken({
                refreshToken: authenticationObject.refreshToken,
            });

            this.props.setLoadingFalse();
        } catch (e) {
            console.log("Hello: ", e);
            // this.props.setLoadingFalse();
        }
    };

    render() {
        console.log('all');
        const { accessToken, loading } = this.props.authentication;

        if (loading) {
            return (
                <GuestNavigation />
            );
        }

        if (accessToken) {
            return (
                <Stack.Navigator>
                    <Stack.Screen name="Home">
                        {props => <LoggedIn {...props} accessToken={accessToken} />}
                    </Stack.Screen>
                </Stack.Navigator>
            )
        }

        return <GuestNavigation />;
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        accessToken: state.authentication.accessToken,
        refreshToken: state.authentication.refreshToken,
    };
};

const mapDispatchToProps = {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryScreen);

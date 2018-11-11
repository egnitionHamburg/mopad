import * as React from "react";
import { FormattedMessage, InjectedIntl, injectIntl } from "react-intl";
import { ApolloError } from "apollo-client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Card, CardContent, CardActions } from "@material-ui/core";
import TeamSelector from "../../app/teamSelector";

interface LoginFormProps {
    error?: ApolloError;
    intl: InjectedIntl;

    onLogin(email: string, password: string): void;
}

interface LoginFormState {
    email: string;
    password: string;
}

export class DisconnectedLoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            email: null,
            password: null
        };
    }

    public render() {
        return (
            <Card className="card login">
                <CardContent>
                    <Typography component="h5" variant="h5">
                        <FormattedMessage id="app.login.headline" />
                    </Typography>
                    <TextField
                        id="email"
                        fullWidth
                        margin="normal"
                        placeholder={this.props.intl.formatMessage({
                            id: "app.login.email.hint"
                        })}
                        label={this.props.intl.formatMessage({
                            id: "app.login.email"
                        })}
                        onChange={event => this.setState({ email: event.target.value })}
                    />
                    <TextField
                        id="password"
                        fullWidth
                        margin="normal"
                        label={this.props.intl.formatMessage({
                            id: "app.login.password"
                        })}
                        onChange={event => this.setState({ password: event.target.value })}
                        type="password"
                    />
                    {this.renderError()}
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={this.handleLogin}>
                        {this.props.intl.formatMessage({
                            id: "app.login.cta"
                        })}
                    </Button>
                </CardActions>
            </Card>
        );
    }

    private handleLogin() {
        this.props.onLogin(this.state.email, this.state.password);
    }

    private renderError() {
        if (!this.props.error) {
            return null;
        }

        const errorKeys = new Set();
        if (this.props.error.graphQLErrors) {
            errorKeys.add(
                this.props.error.graphQLErrors.map(err => err.functionError || "general")
            );
        }

        return (
            <Typography component="p" className="error">
                {[...errorKeys.values()].map(key => (
                    <FormattedMessage key={key} id={"app.login.error." + key} />
                ))}
            </Typography>
        );
    }
}

export default injectIntl(DisconnectedLoginForm);

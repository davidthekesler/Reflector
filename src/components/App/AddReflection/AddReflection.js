import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';


class AddReflection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: '',
            reflection: ''
        }//end state
    }//end constructor

    //uses the name of the user input as a key to set value of user input in state
    handleChange = (inputText) => {
        return (event) => {
            this.setState({
                [inputText]: event.target.value
            });
        }
    }//end handleChangae

    //sends state to reduxState
    handleSubmit = () => {
        this.props.dispatch(
            {
                type: 'ADD_REFLECTION',
                payload: this.state
            }
        );
    }//end handleSubmit

    //render assembles JSX for display to DOM:
    render() {

        //JSX is returned for display to DOM:
        return (
            <div>
                <Card>
                    <CardContent>
                        <p>Topic</p>
                        <div><Input type="text" onChange={this.handleChange('topic')}></Input></div>
                        <p>Reflection</p>
                        <div><Input type="text" fullWidth={true} multiLine={true} onChange={this.handleChange('reflection')}></Input></div>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                    </CardActions>

                </Card>
            </div>
        )
    }//end render

}//end AddReflection Component class

//connects this component to redux via react-redux, user defined 'reduxState' is now accessible on props
const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AddReflection);
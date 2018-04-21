import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { Delete } from 'material-ui-icons';
import { Bookmark } from 'material-ui-icons';
import { BookmarkBorder } from 'material-ui-icons';
import moment from 'moment';
import swal from 'sweetalert';

class ViewReflection extends Component {

    componentDidMount() {
        this.props.dispatch(
            {
                type: 'GET_REFLECTIONS'
            }
        );
    }//end componentDidMount

    handleBookmark = (reflectionInput) => {
        reflectionInput.bookmarked = !reflectionInput.bookmarked;
        console.log('in handleBoookmark, reflection.bookmarked:', reflectionInput.bookmarked);
        this.props.dispatch(
            {
                type: 'UPDATE_REFLECTION',
                payload: reflectionInput
            }
        );
    }//end handleBookmark

    handleDelete = (reflectionInput) => {
        reflectionInput.bookmarked = !reflectionInput.bookmarked;
        console.log('in handleDelete, reflection:', reflectionInput);
        swal({
            title: "Delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.dispatch(
                        {
                            type: 'DELETE_REFLECTION',
                            payload: reflectionInput
                        }
                    );
                } else {
                    return
                }
            });
    }//end handleDelete

    //render assembles JSX for display to DOM:
    render() {
        //reverse sorts array to display most recent date at the top
        let sortedReverseReflectionsArray = this.props.reduxState.allReflectionsReducer.sort(function (a, b) {
            return b.id - a.id
        });

        //sorted array is mapped and a JSX element is created
        let reflectionsDisplayArray = sortedReverseReflectionsArray.map((reflection) => {
            if (reflection.bookmarked) {
                return (
                    <Card key={reflection.id}>
                        <CardContent>
                            <div>{reflection.topic}</div>
                            <div>Added on {moment(reflection.date).utc().format('LL')}</div>
                            <div>{reflection.description}</div>
                        </CardContent>
                        <CardActions>
                            <Delete onClick={() => this.handleDelete(reflection)} /><Bookmark onClick={() => this.handleBookmark(reflection)} />
                        </CardActions>
                    </Card>
                )
            }
            else
                return (
                    <Card key={reflection.id}>
                        <CardContent>
                            <div>{reflection.topic}</div>
                            <div>Added on {moment(reflection.date).utc().format('LL')}</div>
                            <div>{reflection.description}</div>
                        </CardContent>
                        <CardActions>
                            <Delete onClick={() => this.handleDelete(reflection)} /><BookmarkBorder onClick={() => this.handleBookmark(reflection)} />
                        </CardActions>
                    </Card>
                )

        });
        //JSX is returned for display to DOM:
        return (
            <div>
                {reflectionsDisplayArray}
            </div>
        )//end DOM return

    }//end render

}//end ViewReflection Component class

//connects this component to redux via react-redux, user defined 'reduxState' is now accessible on props
const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ViewReflection);
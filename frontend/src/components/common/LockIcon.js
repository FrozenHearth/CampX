import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  lockIconAvatar: {
    backgroundColor: 'rgb(220, 0, 78)',
    margin: '10em auto -7em auto',
    padding: '1.2em'
  }
};

const LockIcon = props => {
  const { classes } = props;
  return (
    <Avatar className={classes.lockIconAvatar}>
      <LockOutlinedIcon />
    </Avatar>
  );
};

export default withStyles(styles)(LockIcon);

import React from 'react';

import { getUserByIdSelector } from '@redux/users';
import { useParamSelector } from '@utils/hooks';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    name: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
}))

const Member = ({id}) => {
    const user = useParamSelector(getUserByIdSelector, { userId: id });
    const firstName = user.firstName;
    const middleName = user.middleName;
    const lastName = user.lastName;

    return (
        <div className="root">
            <div className='name'>{`${firstName} ${middleName} ${lastName}`}</div>
        </div>    
    );
};

export default Member;
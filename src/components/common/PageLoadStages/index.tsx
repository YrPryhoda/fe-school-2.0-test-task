import React from 'react';

import {ErrorHandler} from '../ErrorHandler';
import {PageLayout} from '../PageLayout';
import {Spinner} from '../Spinner';

interface IProps {
    loading: boolean;
    error: string | null;
}

export const PageLoadStages = ({loading, error}: IProps) => {
    return <PageLayout>
        {
            loading
                ? <Spinner/>
                : error
                    ? <ErrorHandler errMessage={error}/>
                    : <h6>There is nothing found here</h6>
        }
    </PageLayout>;
};

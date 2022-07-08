import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../state/sharedState';


export default function Loading() {
  const loading = useRecoilValue(loadingState);

  return (
    <React.Fragment>
      {loading ? <Box sx={{ width: '100%' }}>
        <LinearProgress style={{ backgroundColor: '#0dcaf0' }} />
      </Box> : null}
    </React.Fragment>
  );
}
import React from 'react';

import { Box, Title } from './styled';

export default ({data, index, onPress}) => {

    return (
            <Box onPress={() =>onPress(data)}>
                <Title>{data.descricao}</Title>
            </Box>
    );
    
}
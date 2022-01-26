import React from 'react';
import { Cell } from '../../types/types';
import { borderStyle, textStyle } from './shared-styles';

interface LabelCellProps {
  cell: Cell;
  style: ReactWindow.ItemStyle;
}

const labelTextStyle: React.CSSProperties = {
  ...textStyle,
  fontStyle: 'italic'
};

const DimensionTitleCell = ({ cell, style }: LabelCellProps): JSX.Element => (
  <div style={{ ...style, ...borderStyle }}>
    <div style={labelTextStyle}>{cell.value}</div>
  </div>
);

export default DimensionTitleCell;
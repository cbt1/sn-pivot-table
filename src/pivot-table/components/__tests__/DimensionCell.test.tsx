import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DimensionCell, { testId, testIdCollapseIcon, testIdExpandIcon } from '../DimensionCell';
import { Cell, DataModel, ItemData } from '../../../types/types';
import { NxPivotDimensionCell } from '../../../types/QIX';

describe('DimensionCell', () => {
  let constraints: Stardust.Constraints;
  let dataModel: DataModel;
  let data: ItemData;
  let cell: Cell;
  const style: React.CSSProperties = {
    position: 'absolute',
    left: '25px',
    top: '35px',
    width: '100px',
    height: '150px'
  };
  const qText = 'test value';

  let expandLeftSpy: jest.SpyInstance;
  let expandTopSpy: jest.SpyInstance;
  let collapseLeftSpy: jest.SpyInstance;
  let collapseTopSpy: jest.SpyInstance;

  beforeEach(() => {
    constraints = {
      active: false,
      passive: false,
      select: false,
    };

    dataModel = {
      pivotData: { matrix: [], topMatrix: [], leftMatrix: [], nbrTopRows: 0, nbrLeftColumns: 0 },
      fetchNextPage: () => {},
      hasMoreColumns: false,
      hasMoreRows: false,
      collapseLeft: () => {},
      collapseTop: () => {},
      expandLeft: () => {},
      expandTop: () => {}
    };

    expandLeftSpy = jest.spyOn(dataModel, 'expandLeft');
    expandTopSpy = jest.spyOn(dataModel, 'expandTop');
    collapseLeftSpy = jest.spyOn(dataModel, 'collapseLeft');
    collapseTopSpy = jest.spyOn(dataModel, 'collapseTop');

    data = {
      dataModel,
      constraints,
      pivotData: dataModel.pivotData
    };

    cell = {
      key: 1,
      type: 'dim',
      value: {
        qText,
        qCanExpand: false,
        qCanCollapse: false,
      } as NxPivotDimensionCell
    };
  });

  test('should render', () => {
    render(<DimensionCell
      cell={cell}
      data={data}
      rowIndex={0}
      colIndex={1}
      style={style}
      isLeftColumn={false}
    />);

    expect(screen.getByText(qText)).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toHaveStyle(style as Record<string, unknown>);
  });

  test('should not render expand or collapse icon if cell is not expandable or collapseable', () => {
    (cell.value as NxPivotDimensionCell).qCanExpand = false;
    (cell.value as NxPivotDimensionCell).qCanCollapse = false;

    render(<DimensionCell
      cell={cell}
      data={data}
      rowIndex={0}
      colIndex={1}
      style={style}
      isLeftColumn={false}
    />);

    expect(screen.queryByTestId(testIdExpandIcon)).toBeNull();
    expect(screen.queryByTestId(testIdCollapseIcon)).toBeNull();
  });

  describe('left column interactions', () => {
    test('should be possible to expand left column', () => {
      (cell.value as NxPivotDimensionCell).qCanExpand = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn />);

      expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(expandLeftSpy).toHaveBeenCalledWith(0, 1);
    });

    test('should not be possible to expand left column when active constraint is true', () => {
      (cell.value as NxPivotDimensionCell).qCanExpand = true;
      data.constraints.active = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn />);

      expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(expandLeftSpy).toHaveBeenCalledTimes(0);
    });

    test('should be possible to collapse left column', () => {
      (cell.value as NxPivotDimensionCell).qCanCollapse = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn />);

      expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(collapseLeftSpy).toHaveBeenCalledWith(0, 1);
    });

    test('should be not possible to collapse left column when active constraint is true', () => {
      (cell.value as NxPivotDimensionCell).qCanCollapse = true;
      data.constraints.active = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn />);

      expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(collapseLeftSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('top row interactions', () => {
    test('should be possible to expand top row', () => {
      (cell.value as NxPivotDimensionCell).qCanExpand = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn={false} />);

      expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(expandTopSpy).toHaveBeenCalledWith(0, 1);
    });

    test('should not be possible to expand top row when active constraint is true', () => {
      (cell.value as NxPivotDimensionCell).qCanExpand = true;
      data.constraints.active = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn={false} />);

      expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(expandTopSpy).toHaveBeenCalledTimes(0);
    });

    test('should be possible to collapse top row', () => {
      (cell.value as NxPivotDimensionCell).qCanCollapse = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn={false} />);

      expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(collapseTopSpy).toHaveBeenCalledWith(0, 1);
    });

    test('should be not possible to collapse top row when active constraint is true', () => {
      (cell.value as NxPivotDimensionCell).qCanCollapse = true;
      data.constraints.active = true;

      render(<DimensionCell cell={cell} data={data} rowIndex={0} colIndex={1} style={style} isLeftColumn={false} />);

      expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
      userEvent.click(screen.getByText(qText));

      expect(collapseTopSpy).toHaveBeenCalledTimes(0);
    });
  });
});
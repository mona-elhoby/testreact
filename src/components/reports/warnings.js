import React, { useEffect, useMemo, useState } from 'react';
import { Table, Pagination, Toggle, TagPicker } from 'rsuite';
import { CButton, CFormLabel, CFormInput } from '@coreui/react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles } from '@mui/material/styles';
import { useIntl } from 'react-intl';

import 'rsuite/dist/rsuite.css';
import 'rsuite/dist/rsuite-rtl.css';
import 'rsuite/dist/rsuite.min.js.map';

import { getWarningsData } from '../../store/reducers/warnings';
import { useDispatch, useSelector } from 'react-redux';
import translation from '../../i18n/translate';

const { Column, HeaderCell, Cell } = Table;

const ItemTypes = {
	COLUMN: 'column',
	ROW: 'row',
};

const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = (props) => <HeaderCell {...props} style={{ padding: 4 }} />;
function DraggableHeaderCell({ children, onDrag, id, ...rest }) {
	const ref = React.useRef(null);

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.COLUMN,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
		drop(item, monitor) {
			onDrag(item.id, id);
		},
	});

	const [{ isDragging }, drag, preview] = useDrag({
		type: ItemTypes.COLUMN,
		item: () => ({ id }),
		// item: { type: ItemTypes.COLUMN, id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	const isActive = canDrop && isOver;

	preview(drop(ref));
	drag(drop(ref));

	const styles = {
		padding: '0.6rem 1rem',
		cursor: 'grab',
		opacity: isDragging ? 0 : 1,
		borderLeft: isActive ? '2px solid #2589f5' : null,
	};

	return (
		<HeaderCell {...rest} style={{ padding: 0 }}>
			<div ref={ref} style={styles}>
				{children}
			</div>
		</HeaderCell>
	);
}

function Row({ children, onDrag, id, rowData, ...rest }) {
	const ref = React.useRef(null);

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.ROW,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
		drop(item, monitor) {
			onDrag && onDrag(item.id, rowData.id);
		},
	});

	const [{ isDragging }, drag] = useDrag({
		// item: { id: rowData.id, type: ItemTypes.ROW },
		type: ItemTypes.ROW,
		item: () => ({ id: rowData.id }),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const isActive = canDrop && isOver;

	drag(drop(ref));

	const styles = {
		cursor: 'grab',
		opacity: isDragging ? 0.5 : 1,
		background: isActive ? '#ddd' : null,
		width: '100%',
		height: '100%',
		borderTop: isActive ? '2px solid #2589f5' : null,
	};

	return (
		<div ref={ref} style={styles}>
			{children}
		</div>
	);
}

function sort(source, sourceId, targetId) {
	const nextData = source.filter((item) => item.key !== sourceId);
	const dragItem = source.find((item) => item.key === sourceId);
	const index = nextData.findIndex((item) => item.key === targetId);
	nextData.splice(index, 0, dragItem);
	return nextData;
}

const App = () => {
	const [limit, setLimit] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const [compact, setCompact] = React.useState(true);
	const [bordered, setBordered] = React.useState(true);
	const [color, setColor] = React.useState('#1e42a0');
	const [searchVal, setSearchVal] = React.useState('')
	const { formatMessage } = useIntl();

	const defaultColumns = [
		// {
		// 	key: 'id',
		// 	label: '# ',
		// 	width: 30
		// },
		{
		  key: "WRN_NUMBER",
		  label: formatMessage({id: 'warningNumber'}),
		},
		{
		  key: "WRN_DATE",
		  label: formatMessage({id: 'registerDate'}),
		},
		{
			key: 'WRN_DURATION',
			label: formatMessage({id: 'period'}),
		},
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'EMP_NAME_ENGLISH'? 'EMP_NAME_ENGLISH' : 'EMP_NAME',
			label: formatMessage({id: 'follower'}),
		},
	
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'WRN_STATUS_NAME_EN' ? 'WRN_STATUS_NAME_EN' : 'WRN_STATUS_NAME',
			label: formatMessage({id: 'status'}),
		},
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'WRN_METHOD_NAME_EN' ? 'WRN_METHOD_NAME_EN' : 'WRN_METHOD_NAME',
			label: formatMessage({id: 'method'}),
		},
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'CLI_NAME_ENGLISH' ? 'CLI_NAME_ENGLISH' : 'CLI_NAME',
			label: formatMessage({id: 'clientName'}),
		},
		{
		  key: document.body.getAttribute('dir') == 'ltr' && "WRN_SUBJECT_NAME_EN" ? "WRN_SUBJECT_NAME_EN" : "WRN_SUBJECT_NAME",
		  label: formatMessage({id: 'warnSubject'}),
		
		},
		{
			key: 'WRN_ENDDATE',
			label: formatMessage({id: 'epiryDate'}),
		},
		{
			key: 'CAS_NUMBER',
			label: formatMessage({id: 'fileNum'}),
		},
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'AGENTS_EN' ? 'AGENTS_EN' : 'AGENTS',
			label: formatMessage({id: 'agents'}),
		},
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'ANTS_EN' ? 'ANTS_EN' : 'ANTS',
			label: formatMessage({id: 'ants'}),
		},
		{
			key: 'CLI_NAME',
			label: formatMessage({id: 'clientName'}),
		},
		{
			key: document.body.getAttribute('dir') == 'ltr' && 'FIL_SOURCE_NAME_EN' ? 'FIL_SOURCE_NAME_EN' : 'FIL_SOURCE_NAME',
			label: formatMessage({id: 'source'}),
		},
		{
			key: 'FIL_MEDITOR_NAME',
			label: formatMessage({id: 'meditator'}),
		},
	];
	const [theColumns, setTheColumns] = React.useState(defaultColumns);

	const useStyles = makeStyles({
		tableHead: {
			color: color,
			fontWeight: 'bold',
		},
	});
	const classes = useStyles();
	const dispatch = useDispatch();
	const { allWarnings} = useSelector((state) => state.warning);
	const [data, setData] = React.useState(allWarnings?.data);

	const handleDragColumn = (sourceId, targetId) => {
		setTheColumns(sort(theColumns, sourceId, targetId));
	};

	const handleDragRow = (sourceId, targetId) => {
		setData(sort(data, sourceId, targetId));
	};

	const [columnKeys, setColumnKeys] = React.useState(theColumns.map((column) => column.key));
	const columns = theColumns.filter((column) => columnKeys.some((key) => key === column.key));
	const CustomCell = compact ? CompactCell : Cell;
	const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

	useEffect(() => {
		dispatch(getWarningsData({ theParams: { limit: limit, offset: limit * (page - 1) } })).then((res) => {
			console.log(res)
			const newArr = res?.payload?.data?.map((ele, i) => ({
				...ele,
				id: (i += 1),
				WRN_DATE: new Date(ele.WRN_DATE).toLocaleDateString(),
				WRN_ENDDATE: new Date(ele.WRN_ENDDATE).toLocaleDateString()
			}));
			console.log(newArr)
			setData(newArr);
		});
	}, [dispatch, limit]);

	const handleChangeLimit = (dataKey) => {
		setPage(1);
		setLimit(dataKey);
		dispatch(getWarningsData({ theParams: { limit: dataKey } })).then((res) => {
			const newArr = res?.payload?.data?.map((ele, i) => ({
				...ele,
				id: (i += 1),
				WRN_DATE: new Date(ele.WRN_DATE).toLocaleDateString(),
				WRN_ENDDATE: new Date(ele.WRN_ENDDATE).toLocaleDateString()
			}));
			// console.log(newArr)
			setData(newArr);
		});
	};

	const onChangePage = e => {
		setPage(e)
		dispatch(getWarningsData({ theParams: { limit: limit, offset: limit * (page - 1) } })).then((res) => {
			const newArr = res?.payload?.data?.map((ele, i) => ({
				...ele,
				id: (i += 1),
				WRN_DATE: new Date(ele.WRN_DATE).toLocaleDateString(),
				WRN_ENDDATE: new Date(ele.WRN_ENDDATE).toLocaleDateString()
			}));
			// console.log(newArr)
			setData(newArr);
		});
	}

	//print function
	const printTable = () => {
		var content = document.getElementById('divcontents');
		var pri = document.getElementById('ifmcontentstoprint').contentWindow;
		pri.document.open();
		pri.document.write(content.innerHTML);
		// console.log(content.innerHTML)
		pri.document.close();
		pri.focus();
		window.print();
		const newColumns = theColumns.map((ele) => ({
			...ele,
			width: document.getElementById(ele.key)?.offsetWidth ? document.getElementById(ele.key)?.offsetWidth : 0,
		}));
		console.log(JSON.stringify(newColumns));
	};

	const handelSearchbtn = e => {
		if(e.key === 'Enter'){
			dispatch(getWarningsData({ theParams: { limit: limit, offset: limit * (page - 1), searchVal: e.target.value } })).then((res) => {
				// console.log(res)
				const newArr = res?.payload?.data?.map((ele, i) => ({
					...ele,
					id: (i += 1),
					WRN_DATE: new Date(ele.WRN_DATE).toLocaleDateString(),
					WRN_ENDDATE: new Date(ele.WRN_ENDDATE).toLocaleDateString()
				}));
				// console.log(newArr)
				setData(newArr);
			});
		}
	}

	return (
		<>
			<div className="clearPrint">
				{/* {console.log('data', data)} */}
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<p>
							Compact：
							<Toggle checkedChildren="On" unCheckedChildren="Off" checked={compact} onChange={setCompact} />
						</p>

						<p>
							Bordered：
							<Toggle checkedChildren="On" unCheckedChildren="Off" checked={bordered} onChange={setBordered} />
						</p>
						<p>
							Color：
							<input className="colorpicker" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
						</p>
					</div>
					<CButton onClick={() => printTable()}>{formatMessage({id: 'print'})}</CButton>
				</div>
				<hr />
				<div style={{ display: 'flex', alignItems: 'baseline' }}>
					<div style={{ display: 'flex', alignItems: 'baseline' }}>
					<span>{translation('columns')}: </span>
					<TagPicker data={defaultColumns} labelKey="label" valueKey="key" value={columnKeys} onChange={setColumnKeys} cleanable={false} />
					</div>
					<div>
						<div className="search">
							<CFormInput
								type="text"
								value={searchVal}
								onChange={(e) => setSearchVal(e.target.value)}
								placeholder={`${formatMessage({id: 'search'})}...`}
								onKeyDown={(e) => handelSearchbtn(e)}
							/>
						</div>
						</div>
				</div>
			</div>
			<div id="divcontents" className='notExpanded'>
				<DndProvider backend={HTML5Backend}>
					<Table
						wordWrap="break-word"
						autoHeight
						affixHeader
						affixHorizontalScrollbar
						height={420}
						data={data}
						loading={loading}
						bordered
						cellBordered
						headerHeight={compact ? 30 : 40}
						rowHeight={compact ? 30 : 46}
						rowKey="id"
						// renderRow={(children, rowData) => {
						// 	return rowData ? (
						// 		<Row key={rowData.key} rowData={rowData} id={rowData.key} onDrag={handleDragRow}>
						// 			{children}
						// 		</Row>
						// 	) : (
						// 		children
						// 	);
						// }}
					>
						<Column width={40} align="center" fixed>
							<HeaderCell className={classes.tableHead}>#</HeaderCell>
							<Cell dataKey="id" />
						</Column>
						{columns.map((column, i) => {
							const { key, label, ...rest } = column;
							return (
								<Column {...rest} key={key} align="center" fixed resizable>
									{/* <CustomHeaderCell>{label}</CustomHeaderCell> */}
									<DraggableHeaderCell onDrag={handleDragColumn} id={key} className={classes.tableHead}>
										<p id={key}>{label}</p>
									</DraggableHeaderCell>
									<CustomCell dataKey={key} />
								</Column>
							);
						})}
					</Table>
					<div style={{ padding: 20 }}>
						<Pagination
							prev
							next
							first
							last
							ellipsis
							boundaryLinks
							maxButtons={5}
							size="xs"
							layout={['total', '-', 'limit', '|', 'pager', 'skip']}
							total={allWarnings.total}
							limitOptions={[10, 20, 30]}
							limit={limit}
							activePage={page}
							onChangePage={onChangePage}
							onChangeLimit={handleChangeLimit}
						/>
					</div>
				</DndProvider>
			</div>
			<iframe id="ifmcontentstoprint" style={{ height: 0, width: 0, position: 'absolute' }}></iframe>
		</>
	);
};

export default App;

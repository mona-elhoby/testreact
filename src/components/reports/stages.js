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
import translation from '../../i18n/translate';

import { getAllStages } from '../../store/reducers/stage';
import { useDispatch, useSelector } from 'react-redux';

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
	const [sesDate, setSesDate] = useState('');
	const [sesFromDate, setSesFromDate] = useState('');
	const [sesToDate, setSesToDate] = useState('');
	const [searchVal, setSearchVal] = React.useState('')

	const { formatMessage } = useIntl();
	
 const basicColumns = [
	// {
	//   key: "CLI_NAME",
	//   label: formatMessage({id: 'clientName'}),
	// },
	// {
	//   key: "lastName",
	//   label: formatMessage({id: 'basicCase'}) ,
	// },
	{
		key: 'STG_NUMBER',
		label: formatMessage({id: 'stageNum'}),
	},
	{
		key: document.body.getAttribute('dir') == 'ltr' && 'STG_TYPE_NAME_EN' ? 'STG_TYPE_NAME_EN': 'STG_TYPE_NAME',
		label: formatMessage({id: 'stageType'}),
	},

	// {
	//   key: "city",
	//   label: formatMessage({id: 'registerDate'}),
	//
	// },

	{
		key:  document.body.getAttribute('dir') == 'ltr' && 'STG_RESULT_NAME_EN' ? 'STG_RESULT_NAME_EN' : 'STG_RESULT_NAME',
		label: formatMessage({id: 'caseResult'}),
	},
	// {
	//   key: "city",
	//   label: formatMessage({id: 'stage'}),
	//
	// },
	{
		key: document.body.getAttribute('dir') == 'ltr' && 'STG_STATUS_NAME_EN' ? 'STG_STATUS_NAME_EN' : 'STG_STATUS_NAME',
		label: formatMessage({id: 'caseStatus'}),
	},
	{
		key: document.body.getAttribute('dir') == 'ltr' && 'OFC_NAME_EN' ? 'OFC_NAME_EN' : 'OFC_NAME',
		label: formatMessage({id: 'office'}),
	},
	{
		key: document.body.getAttribute('dir') == 'ltr' && 'COU_NAME_EN' ? 'COU_NAME_EN' : 'COU_NAME',
		label: formatMessage({id: 'court'}),
	},
	// {
	//   key: "city",
	//   label: formatMessage({id: 'notes'}),
	//
	// },
	{
		key: 'FIL_MEDITOR_NAME',
		label: formatMessage({id: 'follower'}),
	},
	// {
	//   key: "city",
	//   label: formatMessage({id: 'warningNum'}),
	//
	// },
	{
		key: 'CAS_NUMBER',
		label: formatMessage({id: 'fileNum'}),
	},
	// {
	//   key: "city",
	//   label: formatMessage({id: 'issueOfLiaison'}),
	//
	// },
	{
		key: 'AGENTS',
		label: formatMessage({id: 'agents'}),
	},
	{
		key: 'ANTS',
		label: formatMessage({id: 'ants'}),
	},
	// {
	//   key: "city",
	//   label: formatMessage({id: 'lastSessionDate}),
	//
	// },
	// {
	//   key: "city",
	//   label: formatMessage({id: 'nextSessionDate}),
	//
	// },
	// {
	//   key: "city",
	//   label: formatMessage({id: 'source'}),
	//
	// },
	// {
	//   key: "city",
	//   label: formatMessage({id: 'fileStatus'}),
	//
	// },
	// {
	//   key: "city",
	//   label: formatMessage({id: 'fileCategory'}),
	//
	// },
	// {
	//   key: "city",
	//   label: formatMessage({id: 'meditator'}),
	//
	// },
	// {
	//   key: "city",
	//   label: formatMessage({id: 'casType'}),
	//
	// },
	// {
	//   key: "city",
	//   label: "تفاصيل الموضوع",
	//
	// },
	// {
	//   key: "city",
	//   label: "تاريخ إغلاق الملف",
	//
	// },
	// {
	//   key: "city",
	//   label: "سبب الإغلاق",
	//
	// },
];
const [theColumns, setTheColumns] = React.useState(basicColumns);
	const useStyles = makeStyles({
		tableHead: {
			color: color,
			fontWeight: 'bold',
		},
	});
	const classes = useStyles();
	const dispatch = useDispatch();
	const { theAllStages } = useSelector((state) => state.stage);
	const [data, setData] = React.useState(theAllStages?.data);

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
		dispatch(getAllStages({ theparams: { limit: limit, offset: limit * (page - 1) } })).then((res) => {
			const newArr = res?.payload?.data?.map((ele, i) => ({
				...ele,
				stgId: (i += 1),
			}));
			// console.log(newArr)
			setData(newArr);
		});
	}, [dispatch, limit]);

	const handleChangeLimit = (dataKey) => {
		setPage(1);
		setLimit(dataKey);
		dispatch(getAllStages({ theparams: { limit: dataKey } })).then((res) => {
			const newArr = res?.payload?.data?.map((ele, i) => ({
				...ele,
				stgId: (i += 1),
			}));
			// console.log(newArr)
			setData(newArr);
		});
	};

	const onChangePage = (e) => {
		setPage(e);
		dispatch(getAllStages({ theparams: { limit: limit, offset: limit * (page - 1) } })).then((res) => {
			const newArr = res?.payload?.data?.map((ele, i) => ({
				...ele,
				stgId: (i += 1),
			}));
			// console.log(newArr)
			setData(newArr);
		});
	};

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
		if (e.key === 'Enter') {
			dispatch(getAllStages({ theparams: { limit: limit, offset: limit * (page - 1), searchVal: e.target.value } })).then((res) => {
				const newArr = res?.payload?.data?.map((ele, i) => ({
					...ele,
					stgId: (i += 1),
				}));
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
					<CButton onClick={() => printTable()}>{translation('print')}</CButton>
				</div>
				<hr />
				<div style={{ display: 'flex', alignItems: 'baseline' }}>
					<div style={{ display: 'flex', alignItems: 'baseline' }}>
					<span>{translation('columns')}:</span>
					<TagPicker data={basicColumns} labelKey="label" valueKey="key" value={columnKeys} onChange={setColumnKeys} cleanable={false} />
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
			<div id="divcontents" className="notExpanded">
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
						<Column width={30} align="center" fixed>
							<HeaderCell className={classes.tableHead}>#</HeaderCell>
							<Cell dataKey="stgId" />
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
							total={theAllStages.total}
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

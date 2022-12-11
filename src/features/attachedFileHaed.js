import React from 'react';
import { CTableHeaderCell, CTableHead, CTableRow } from '@coreui/react';

const attachedHeadTable = (props) => (
	<CTableHead className="attachedHeader">
		<CTableRow>
			<CTableHeaderCell scope="col">#</CTableHeaderCell>
			<CTableHeaderCell scope="col">إسم الملف</CTableHeaderCell>
			<CTableHeaderCell scope="col">النوع</CTableHeaderCell>
			<CTableHeaderCell scope="col">الحجم (KB)</CTableHeaderCell>
			<CTableHeaderCell scope="col">التاريخ</CTableHeaderCell>
			<CTableHeaderCell scope="col">المستخدم</CTableHeaderCell>
			{props.editCiteria ? <CTableHeaderCell scope="col"></CTableHeaderCell> : null}
		</CTableRow>
	</CTableHead>
);
export default attachedHeadTable;

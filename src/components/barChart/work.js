import React, { useEffect, useState, useRef, useMemo } from 'react';
import { CRow, CCol, CCard, CCardBody } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { getChart } from '../../store/reducers/chart';
import {colorsChart} from "../../contraints/colorChart"

ChartJS.register(ArcElement, Tooltip, Legend);
const AccountBarChart = () => {
	const [account1, setAccount1] = useState([]);
	const [account2, setAccount2] = useState([]);
	const [account3, setAccount3] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		const dateNow = new Date();
		dateNow.setFullYear(dateNow.getFullYear() - 1);
		dispatch(
			getChart({
				mainNameChart: 'work',
				chartType: 'work_status',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount1(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'work',
				chartType: 'work_employee',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount2(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'work',
				chartType: 'work_type',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount3(res.payload));
	}, [dispatch]);
    const spanbg = document.getElementsByClassName('spanVariant');
    
    useMemo(()=> {
        Array.prototype.forEach.call(spanbg, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
    }, [spanbg, spanbg.length])
	return (
		<div>
			<CRow>
				<CCol lg={3} md={4} sm={6}>{console.log(account1[0])}
					<CCard className="mb-4 customchart">
                        <h5>حالات الأعمال</h5>
						<CCardBody className='container-card'>
							<Doughnut
								data={{
									labels: account1?.map((ele) => ele._NAME),
									datasets: [
										{
											data: account1?.map((ele) => ele._VALUE),
											backgroundColor: account1?.map((ele,i) => colorsChart[i]),
											hoverBackgroundColor: account1?.map((ele,i) => colorsChart[i]),
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
                                {
                                    account1.slice(0,2)?.map((ele, i) => (
                                        <div key={i}>
                                            <span className="allChart spanVariant"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account1.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant"></span>
                                            <span>{ele?._NAME}</span>
                                    </div>
                                    ))}
                                </div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol lg={3} md={4} sm={6}>
					<CCard className="mb-4 customchart">
                        <h5>المكلفين بالأعمال</h5>
						<CCardBody className='container-card'>
							<Doughnut
								data={{
									labels: account2?.map((ele) => ele._NAME),
									datasets: [
										{
											data: account2?.map((ele) => ele._VALUE),
											backgroundColor: account2?.map((ele,i) => colorsChart[i]),
											hoverBackgroundColor: account2?.map((ele,i) => colorsChart[i]),
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
                                {
                                    account2.slice(0,2)?.map((ele, i) => (
                                        <div key={i}>
                                            <span className="allChart spanVariant"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account2.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant"></span>
                                            <span>{ele?._NAME}</span>
                                    </div>
                                    ))}
                                </div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol lg={3} md={4} sm={6}>
					<CCard className="mb-4 customchart">
                        <h5>أنواع الأعمال</h5>
						<CCardBody className='container-card'>
							<Doughnut
								data={{
									labels: account3?.map((ele) => ele._NAME),
									datasets: [
										{
											data: account3?.map((ele) => ele._VALUE),
											backgroundColor: account3?.map((ele,i) => colorsChart[i]),
											hoverBackgroundColor: account3?.map((ele,i) => colorsChart[i]),
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
                                {
                                    account3.slice(0,2)?.map((ele, i) => (
                                        <div key={i}>
                                            <span className="allChart spanVariant"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account3.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant"></span>
                                            <span>{ele?._NAME}</span>
                                    </div>
                                    ))}
                                </div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</div>
	);
};

export default AccountBarChart;

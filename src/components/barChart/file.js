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
	const [account4, setAccount4] = useState([]);
	const [account5, setAccount5] = useState([]);
	const [account6, setAccount6] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		const dateNow = new Date();
		dateNow.setFullYear(dateNow.getFullYear() - 1);
		dispatch(
			getChart({
				mainNameChart: 'file',
				chartType: 'file_status',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount1(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'file',
				chartType: 'file_subject',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount2(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'file',
				chartType: 'file_source',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount3(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'file',
				chartType: 'file_closetype',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount4(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'file',
				chartType: 'file_meditor',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount5(res.payload));
		dispatch(
			getChart({
				mainNameChart: 'file',
				chartType: 'file_type',
				durationType: 'all',
				fromDate: new Date(dateNow).toISOString().split('T')[0],
				toDate: new Date().toISOString().split('T')[0],
			})
		).then((res) => setAccount6(res.payload));
	}, [dispatch]);
    const spanbg = document.getElementsByClassName('spanVariant');
    const spanbg2 = document.getElementsByClassName('spanVariant2');
    const spanbg3 = document.getElementsByClassName('spanVariant3');
    const spanbg4 = document.getElementsByClassName('spanVariant4');
    const spanbg5 = document.getElementsByClassName('spanVariant5');
    const spanbg6 = document.getElementsByClassName('spanVariant6');
    
    useMemo(()=> {
        Array.prototype.forEach.call(spanbg, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
        Array.prototype.forEach.call(spanbg2, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
        Array.prototype.forEach.call(spanbg3, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
        Array.prototype.forEach.call(spanbg4, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
        Array.prototype.forEach.call(spanbg5, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
        Array.prototype.forEach.call(spanbg6, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
    }, [spanbg, spanbg.length, spanbg2, spanbg2.length,spanbg3, spanbg.length3,spanbg4, spanbg4.length,spanbg5, spanbg5.length,spanbg6, spanbg6.length])
	return (
		<div>
			<CRow>
				<CCol lg={3} md={4} sm={6}>
					<CCard className="mb-4 customchart">
                        <h5>حاله الملف</h5>
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
                        <h5>موضوع الملف</h5>
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
                                            <span className="allChart spanVariant2"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account2.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant2"></span>
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
                        <h5>مصادر الملفات</h5>
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
                                            <span className="allChart spanVariant3"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account3.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant3"></span>
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
                        <h5>سبب الإغلاق</h5>
						<CCardBody className='container-card'>
							<Doughnut
								data={{
									labels: account4?.map((ele) => ele._NAME),
									datasets: [
										{
											data: account4?.map((ele) => ele._VALUE),
											backgroundColor: account4?.map((ele,i) => colorsChart[i]),
											hoverBackgroundColor: account4?.map((ele,i) => colorsChart[i]),
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
                                    account4.slice(0,2)?.map((ele, i) => (
                                        <div key={i}>
                                            <span className="allChart spanVariant4"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account4.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant4"></span>
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
                        <h5>الوسطاء التجاريين</h5>
						<CCardBody className='container-card'>
							<Doughnut
								data={{
									labels: account5?.map((ele) => ele._NAME),
									datasets: [
										{
											data: account5?.map((ele) => ele._VALUE),
											backgroundColor: account5?.map((ele,i) => colorsChart[i]),
											hoverBackgroundColor: account5?.map((ele,i) => colorsChart[i]),
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
                                    account5.slice(0,2)?.map((ele, i) => (
                                        <div key={i}>
                                            <span className="allChart spanVariant5"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account5.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant5"></span>
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
                        <h5>نوع الملف</h5>
						<CCardBody className='container-card'>
							<Doughnut
								data={{
									labels: account6?.map((ele) => ele._NAME),
									datasets: [
										{
											data: account6?.map((ele) => ele._VALUE),
											backgroundColor: account6?.map((ele,i) => colorsChart[i]),
											hoverBackgroundColor: account6?.map((ele,i) => colorsChart[i]),
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
                                    account6.slice(0,2)?.map((ele, i) => (
                                        <div key={i}>
                                            <span className="allChart spanVariant6"></span>
                                            <span>{ele?._NAME}</span>
                                        </div>
                                    ))
                                }
                                <div className="chartLabel">
                                    {account6.slice(2)?.map((ele, i) => (
                                        <div style={{ display: 'block', width: '50%' }} key={i}>
                                        <span className="spanVariant6"></span>
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

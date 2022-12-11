
// export const ReturnedPopup = () => (
// 	<CModal className="contract-modal" visible={props.visible} onClose={() => props.exitSelectModal()}>
// 		<CModalHeader>
// 			<CModalTitle>
// 				<CIcon style={{ height: '20px' }} icon={cilNotes} customClassName="nav-icon" />{' '}
// 				{props.selectedCriteria || props.editCriterai ? <span> العقد رقم {props.editCriterai?.COR_NUMBER || props.selectedCriteria?.COR_NUMBER}</span> : 'إضافه عقد'}
// 			</CModalTitle>
// 		</CModalHeader>
// 		<CModalBody>
// 			<div className="contract-tabs">
// 				<h6 className={props.divActive == 'info' ? 'activeTabs' : null} onClick={() => props.setDivActive('info')}>
// 					بيانات العقد
// 				</h6>
// 				<h6 className={props.divActive == 'payments' ? 'activeTabs' : null} onClick={() => props.setDivActive('payments')}>
// 					دفعات العقد
// 				</h6>
// 				{props.selectedCriteria && (<h6 className={props.divActive == 'attachments' ? 'activeTabs' : null} onClick={() => props.setDivActive('attachments')}>
// 					المرفقات
// 				</h6>)}
// 				{props.divActive == 'receiptVoucher' && <h6 className="activeTabs">سندات القبض والصرف </h6>}
// 			</div>
// 			<div className="containerDivTabs">
// 				<div className={`info ${props.divActive == 'info' ? 'active' : null}`}>
// 					<CRow>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4">العميل</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 							) : (
// 								<FormControl fullWidth>
// 									<Select
// 										displayEmpty
// 										inputProps={{ 'aria-label': 'Without label' }}
// 										onChange={(e) => props.setClientName(e.target.value)}
// 										value={props.clientName}
// 										defaultValue=""
// 									>
// 										{/* {theAppiontmentType.map((name, i) => (
// 									<MenuItem key={Math.random() + i} value={props.name.APP_TYPE_ID_PK}>
// 										{name.APP_TYPE_NAME}
// 									</MenuItem>
// 								))} */}
// 									</Select>
// 								</FormControl>
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4"> النوع</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>{props.selectedCriteria.COR_KIND_NAME ? props.selectedCriteria.COR_KIND_NAME : 'لا يوجد'}</p>
// 							) : (
// 								<FormControl fullWidth>
// 									<Select
// 										displayEmpty
// 										inputProps={{ 'aria-label': 'Without label' }}
// 										onChange={(e) => props.setContractKind(e.target.value)}
// 										value={props.contractKind}
// 										defaultValue=""
// 									>
// 										{/* {theAppiontmentType.map((name, i) => (
// 									<MenuItem key={Math.random() + i} value={props.name.APP_TYPE_ID_PK}>
// 										{name.APP_TYPE_NAME}
// 									</MenuItem>
// 								))} */}
// 									</Select>
// 								</FormControl>
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4">رقم الإتفاقيه</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>{props.selectedCriteria.COR_NUMBER ? props.selectedCriteria.COR_NUMBER : 'لا يوجد'}</p>
// 							) : (
// 								<CFormInput type="number" defaultValue={props.contractNumber} onChange={(e) => props.setContractNumber(e.target.value)} />
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4">تاريخ الإتفاقيه</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>
// 									{props.selectedCriteria?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(props.selectedCriteria?.COR_DATE)) : 'لا يوجد'}
// 								</p>
// 							) : (
// 								<CFormInput type="date" defaultValue={props.contractDate} onChange={(e) => props.setContractDate(e.target.value)} />
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4">قيمه الإتفاقيه</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>{props.selectedCriteria.COR_AMOUNT ? props.selectedCriteria.COR_AMOUNT : 'لا يوجد'}</p>
// 							) : (
// 								<CFormInput defaultValue={props.contractAmount} onChange={(e) => props.setContractAmount(e.target.value)} type="text" />
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4"> مده الإتفاقيه</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>{props.selectedCriteria.COR_DURATION_NAME ? props.selectedCriteria.COR_DURATION_NAME : 'لا يوجد'}</p>
// 							) : (
// 								<CFormInput defaultValue={props.contractDuration} type="text" onChange={(e) => props.setContractDuration(e.target.value)} />
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4"> من تاريخ</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>
// 									{props.selectedCriteria.COR_FROM_DATE
// 										? new Intl.DateTimeFormat('en-US').format(new Date(props.selectedCriteria.COR_FROM_DATE))
// 										: 'لا يوجد'}
// 								</p>
// 							) : (
// 								<CFormInput type="date" defaultValue={props.contractStartFrom} onChange={(e) => props.setContractStartFrom(e.target.value)} />
// 							)}
// 						</CCol>
// 						<CCol md={6}>
// 							<CFormLabel htmlFor="inputEmail4">إلى تاريخ</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>
// 									{props.selectedCriteria?.COR_TO_DATE
// 										? new Intl.DateTimeFormat('en-US').format(new Date(props.selectedCriteria?.COR_TO_DATE))
// 										: 'لا يوجد'}
// 								</p>
// 							) : (
// 								<CFormInput type="date" defaultValue={props.contractStartTo} onChange={(e) => props.setContractStartTo(e.target.value)} />
// 							)}
// 						</CCol>
// 						<CCol md={12}>
// 							<hr />
// 							<div>
// 								<CFormLabel htmlFor="inputEmail4">عقد قضيه</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria?.COR_WITH_STAGE ? props.selectedCriteria?.COR_WITH_STAGE : 'لا يوجد'}</p>
// 								) : (
// 									<>
// 										<Checkbox
// 											{...label}
// 											checked={props.checkedStageContarct}
// 											sx={{
// 												color: '#4527a0',
// 												'&.Mui-checked': {
// 													color: '#5e35b1',
// 												},
// 											}}
// 											onChange={(e) => props.setCheckedStageContarct(e.target.checked)}
// 										/>
// 										<div>
// 											<CFormLabel style={{ display: 'block' }}>المراحل</CFormLabel>
// 											<FormControl fullWidth>
// 												<Select
// 													disabled={!props.checkedStageContarct}
// 													multiple
// 													displayEmpty
// 													value={props.contractStatus}
// 													onChange={props.handleChangeContractStatus}
// 													input={<OutlinedInput />}
// 													renderValue={(selected) => (
// 														<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// 															{selected?.length > 0 ? (
// 																selected?.map((value) => <Chip key={Math.random() + value} label={value} />)
// 															) : (
// 																<Chip label="المراحل" />
// 															)}
// 														</Box>
// 													)}
// 													MenuProps={MenuProps}
// 													inputProps={{ 'aria-label': 'Without label' }}
// 												>
// 													{/* {names.map((name) => (
// 														<MenuItem key={name} value={props.name} style={getStyles(name, classifiedName, theme)}>
// 															{name}
// 														</MenuItem>
// 													))} */}
// 												</Select>
// 											</FormControl>
// 										</div>
// 									</>
// 								)}
// 							</div>
// 							<div>
// 								<CFormLabel htmlFor="inputEmail4">عقد إستشاره</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria?.PARENT_NAME ? props.selectedCriteria?.PARENT_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<>
// 										<Checkbox
// 											{...label}
// 											checked={props.checkConultContract}
// 											sx={{
// 												color: '#4527a0',
// 												'&.Mui-checked': {
// 													color: '#5e35b1',
// 												},
// 											}}
// 											onChange={(e) => props.setCheckConultContract(e.target.checked)}
// 										/>
// 										<div>
// 											<FormControl>
// 												<RadioGroup value={props.consultCheck} onChange={(event) => props.setConsultCheck(event.target.value)}>
// 													<div>
// 														<FormControlLabel value="file" control={<Radio />} disabled={!props.checkConultContract} />
// 														<CFormLabel style={{ display: 'inline-block' }}>بالملف كامل</CFormLabel>
// 													</div>
// 													<div>
// 														<FormControlLabel value="hour" control={<Radio />} disabled={!props.checkConultContract} />
// 														<CFormLabel>بالساعه أو الزياره</CFormLabel>
// 														<CFormInput
// 															type="number"
// 															value={props.hoursNum}
// 															onChange={(e) => props.setHoursNum(e.target.value)}
// 															disabled={consultCheck != 'hour'}
// 															className="hourNum"
// 														/>
// 													</div>
// 												</RadioGroup>
// 											</FormControl>
// 										</div>
// 									</>
// 								)}
// 							</div>
// 						</CCol>
// 						<CCol md={12}>
// 							<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
// 							{props.selectedCriteria ? (
// 								<p>{props.selectedCriteria?.COR_NOTES ? props.selectedCriteria?.COR_NOTES : 'لا يوجد'}</p>
// 							) : (
// 								<CFormTextarea rows="5" onChange={(e) => props.setContractNotes(e.target.value)} defaultValue={props.contractNotes} />
// 							)}
// 						</CCol>
// 					</CRow>
// 				</div>
// 				<div className={`payments ${props.divActive == 'payments' ? 'active' : null}`}>
// 					<CRow>
// 						{props.selectedCriteria || props.editCriterai ? (
// 							<CCol md={12}>
// 								<CFormLabel htmlFor="inputEmail4"> تفاصيل الدفعات</CFormLabel>
// 								<CTable className="text-center bordered">
// 									<CTableHead>
// 										<CTableRow>
// 											<CTableHeaderCell scope="col">#</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">النوع</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">رقم السند</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">المبلغ</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">نوع الدفعه</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">حاله الدفعه</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">رقم الشيك</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">تاريخ الشيك</CTableHeaderCell>
// 											<CTableHeaderCell scope="col">البنك</CTableHeaderCell>
// 										</CTableRow>
// 									</CTableHead>
// 									<CTableBody>{props.selectedCriteria ? paidDetail({data:props.selectedCriteria,openReceiptVoucher:props.openReceiptVoucher}) : paidDetail({data:editCriterai,openReceiptVoucher:props.openReceiptVoucher})}</CTableBody>
// 								</CTable>
// 							</CCol>
// 						) : null}
// 						{!props.selectedCriteria && (
// 							<CCol md={12}>
// 								<CFormLabel htmlFor="inputEmail4">تواريخ الدفعات</CFormLabel>
// 								<div className="divTable">
// 									<div className="headRow">
// 										<div className="divCell" align="center">
// 											النوع
// 										</div>
// 										<div className="divCell" align="center">
// 											التاريخ{' '}
// 										</div>
// 										<div className="divCell" align="center">
// 											الحكم{' '}
// 										</div>
// 										<div className="divCell" align="center">
// 											القيمه
// 										</div>
// 									</div>
// 									{props.paidDateAddList}
// 									<CIcon
// 										// onClick={() => openUpdateModal(ele?.WRK_ID_PK)}
// 										style={{ height: '16px', float: 'left', cursor: 'pointer' }}
// 										icon={cilPlus}
// 										customClassName="nav-icon"
// 										onClick={props.handelAddMorePaidDate}
// 									/>
// 								</div>
// 							</CCol>
// 						)}
// 					</CRow>
// 				</div>
// 				<div className={`payments ${props.divActive == 'attachments' ? 'active' : null}`}>
// 					<CRow>
// 						<CCol md={12}>
// 							{
// 								props.selectedCriteria ? (
// 									props.selectedCriteria?._FILE > 0 ? (
// 										<CTable bordered>
// 											<AttachedHeadTable />
// 											<CTableBody>
// 												{props.attachment?.map((ele, i) => (
// 													<CTableRow
// 														key={i}
// 														onClick={() => {
// 															dispatch(
// 																props.getcontractAttachmentData({
// 																	id: props.selectedCriteria?.COR_ID_PK,
// 																	attachedId: ele?.ATH_ID_PK,
// 																	fileName: ele?.ATH_NAME,
// 																})
// 															).then((res) => {
// 																if (res?.payload.status == 404) {
// 																	// console.log(res);
// 																	props.setOpenAttachedSnack(true);
// 																}
// 															});
// 														}}
// 														style={{ cursor: 'pointer' }}
// 													>
// 														<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
// 														<CTableDataCell>{ele?.ATH_NAME}</CTableDataCell>
// 														<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
// 														<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
// 														<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
// 														<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
// 													</CTableRow>
// 												))}
// 											</CTableBody>
// 										</CTable>
// 									) : (
// 										<p>لا يوجد</p>
// 									)
// 								) : null
// 								// (
// 								// 	<CFormInput type="file"
// 								// 	value={props.contractAttachment}
// 								// 	onChange={(e) => setContractAttachment(e.target.value)}
// 								// 	 />
// 								// )
// 							}
// 						</CCol>
// 					</CRow>
// 				</div>
// 				{props.divActive == 'receiptVoucher' && (
// 					<div className={`info active`}>
// 						<CRow>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">نوع السند</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setVoucherType(e.target.value)}
// 											value={props.voucherType}
// 											defaultValue=""
// 										>
// 											{/* {theAppiontmentType.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.APP_TYPE_ID_PK}>
// 												{name.APP_TYPE_NAME}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">العميل</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="text" readOnly value={props.contractById?.CLI_NAME} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم السند</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="number" value={props.voucherNum} onChange={(e) => props.setVoucherNum(e.target.value)} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم الملف</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.handelStageNum(e)}
// 											value={props.fileNum}
// 											defaultValue=""
// 										>
// 											{props.allCases?.data?.map((name, i) => (
// 												<MenuItem key={Math.random() + i} value={props.name.CAS_ID_PK}>
// 													{name.CAS_NUMBER}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">تاريخ السند</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="date" value={props.voucherDate} onChange={(e) => props.setVoucherDate(e.target.value)} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم القضيه</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setStageNum(e.target.value)}
// 											value={props.stageNum}
// 											defaultValue=""
// 										>
// 											{props.theAllStages?.map((name, i) => (
// 												<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 													{name.CAS_NUMBER}
// 												</MenuItem>
// 											))}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">المبلغ</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="number" value={props.voucherAmount} onChange={(e) => props.setVoucherAmount(e.target.value)} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم العقد</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="text" readOnly value={props.contractById?.COR_NUMBER} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">نوع الدفع</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setPaidType(e.target.value)}
// 											value={props.paidType}
// 											defaultValue=""
// 										>
// 											{/* {theAllStages?.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 												{name.CAS_NUMBER}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم الفاتوره</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setIvoiceNum(e.target.value)}
// 											value={props.invoiceNum}
// 											defaultValue=""
// 										>
// 											{/* {theAllStages?.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 												{name.CAS_NUMBER}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم الشيك</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="number" value={props.chequNum} onChange={(e) => props.setChequNum(e.target.value)} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">رقم التسويه</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setSettleNum(e.target.value)}
// 											value={props.settleNum}
// 											defaultValue=""
// 										>
// 											{/* {theAllStages?.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 												{name.CAS_NUMBER}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">تاريخ الشيك</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<CFormInput type="date" value={props.chequDate} onChange={(e) => props.setChequDate(e.target.value)} />
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">البنك</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => setBank(e.target.value)}
// 											value={props.bank}
// 											defaultValue=""
// 										>
// 											{/* {theAllStages?.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 												{name.CAS_NUMBER}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">حاله السند</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setVoucherStatus(e.target.value)}
// 											value={props.voucherStatus}
// 											defaultValue=""
// 										>
// 											{/* {theAllStages?.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 												{name.CAS_NUMBER}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={6}>
// 								<CFormLabel htmlFor="inputEmail4">سبب الدفعه</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (
// 									<FormControl fullWidth>
// 										<Select
// 											displayEmpty
// 											inputProps={{ 'aria-label': 'Without label' }}
// 											onChange={(e) => props.setPaidReason(e.target.value)}
// 											value={props.paidReason}
// 											defaultValue=""
// 										>
// 											{/* {theAllStages?.map((name, i) => (
// 											<MenuItem key={Math.random() + i} value={props.name.CAS_NUMBER}>
// 												{name.CAS_NUMBER}
// 											</MenuItem>
// 										))} */}
// 										</Select>
// 									</FormControl>
// 								)}
// 							</CCol>
// 							<CCol md={12}>
// 							<CFormLabel htmlFor="inputEmail4">ملاحظات</CFormLabel>
// 								{props.selectedCriteria ? (
// 									<p>{props.selectedCriteria.CLI_NAME ? props.selectedCriteria.CLI_NAME : 'لا يوجد'}</p>
// 								) : (<CFormTextarea rows={5} value={props.voucherNotes} onChange={e=> props.setVoucherNotes(e.target.value)}/>)}
// 							</CCol>
// 						</CRow>
// 					</div>
// 				)}
// 			</div>
// 		</CModalBody>
// 		<CModalFooter>
// 			<CButton color="danger" className="btn-modal-close" onClick={() => props.exitSelectModal()}>
// 				إغلاق
// 			</CButton>
// 			{props.selectedCriteria ? null : props.editCriterai ? (
// 				<CButton className="btn-modal-save" color="primary">
// 					حفظ التغيرات
// 				</CButton>
// 			) : (
// 				<CButton className="btn-modal-save" color="primary">
// 					إضافه
// 				</CButton>
// 			)}
// 		</CModalFooter>
// 	</CModal>
// );



{/* <ReturnedPopup 
				visible={visible}
				exitSelectModal={exitSelectModal}
				editCriterai={(!selectedCriteria && editCriterai)? editCriterai:null}
				selectedCriteria={(selectedCriteria && !editCriterai) ? selectedCriteria : null}
				divActive={divActive}
				setDivActive={setDivActive}
				setClientName={setClientName}
				clientName={clientName}
				setContractKind={setContractKind}
				contractKind={contractKind}
				contractNumber={contractNumber}
				setContractNumber={setContractNumber}
				contractDate={contractDate}
				setContractDate={setContractDate}
				contractAmount={contractAmount}
				setContractAmount={setContractAmount}
				contractDuration={contractDuration}
				setContractDuration={setContractDuration}
				contractStartFrom={contractStartFrom}
				setContractStartFrom={setContractStartFrom}
				contractStartTo={contractStartTo}
				setContractStartTo={setContractStartTo}
				checkedStageContarct={checkedStageContarct}
				setCheckedStageContarct={setCheckedStageContarct}
				contractStatus={contractStatus}
				handleChangeContractStatus={handleChangeContractStatus}
				checkConultContract={checkConultContract}
				setCheckConultContract={setCheckConultContract}
				consultCheck={consultCheck}
				setConsultCheck={setConsultCheck}
				hoursNum={hoursNum}
				setHoursNum={setHoursNum}
				setContractNotes={setContractNotes}
				contractNotes={contractNotes}
				openReceiptVoucher={openReceiptVoucher}
				paidDateAddList={paidDateAddList}
				handelAddMorePaidDate={handelAddMorePaidDate}
				attachment={attachment}
				getcontractAttachmentData={getcontractAttachmentData}
				setOpenAttachedSnack={setOpenAttachedSnack}
				setVoucherType={setVoucherType}
				voucherType={voucherType}
				contractById={contractById}
				voucherNum={voucherNum}
				setVoucherNum={setVoucherNum}
				handelStageNum={handelStageNum}
				fileNum={fileNum}
				allCases={allCases}
				voucherDate={voucherDate}
				setVoucherDate={setVoucherDate}
				setStageNum={setStageNum}
				stageNum={stageNum}
				voucherAmount={voucherAmount}
				setVoucherAmount={setVoucherAmount}
				setPaidType={setPaidType}
				paidType={paidType}
				setIvoiceNum={setIvoiceNum}
				invoiceNum={invoiceNum}
				chequNum={chequNum}
				setChequNum={setChequNum}
				setSettleNum={setSettleNum}
				settleNum={settleNum}
				chequDate={chequDate}
				setChequDate={setChequDate}
				setBank={setBank}
				bank={bank}
				setVoucherStatus={setVoucherStatus}
				voucherStatus={voucherStatus}
				setPaidReason={setPaidReason}
				paidReason={paidReason}
				voucherNotes={voucherNotes}
				setVoucherNotes={setVoucherNotes}
				/> */}
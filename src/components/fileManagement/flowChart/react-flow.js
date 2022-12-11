import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "react-flow-renderer";
import {
  CRow,
  CCol,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLayers, cilTrash, cilPencil } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";


import {getStageData, getStageById} from "../../../store/reducers/stage"

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const Tree = () => {
  const [theStages, setTheStages] = useState([]);
  const [item, setItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const dispatch = useDispatch()
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  const { id } = useParams();
  const {allStages} = useSelector(state => state.stage)
  useEffect(() => {
    // console.log(id)
    dispatch(getStageData(id)).then(res => {
      setTheStages(res.payload.data)
    })
  }, [dispatch])

  const getCaseById = (caseId) => {
    // console.log(caseId);
    setVisible(!visible);
    dispatch(getStageById(caseId)).then(res => {
      // console.log(res.payload)
      setItem(res.payload)
    })
  }
  // graph payload
  let theAllNodes = [];
  let links = [];

  useMemo(() => {
    // console.log(allStages)
    let linkNodes = [];
    let parentsNum = [];
    const stages = allStages ;
    if (stages.length > 0) {
      stages.map((ele, i) => {
        if (ele.linkStages.length > 0) {
          for (let l of ele.linkStages) {
            linkNodes.push(l.STG_ID_PK_LINK);
          }
        }
        if (ele.PARENT_ID > 0) {
          parentsNum.push(ele.PARENT_ID);
        }
      });
      parentsNum = [...new Set(parentsNum)];
      for (let stage of stages) {
        const linkStageNode = linkNodes.find((l) => stage.STG_ID_PK == l);

        const parentNode = stages.find(
          (theStage) => theStage.PARENT_ID == stage.STG_ID_PK
        );

        theAllNodes.push({
          id:
            stage.linkStages.length > 0
              ? (stage.STG_ID_PK + 33).toString()
              : stage.STG_ID_PK.toString(),
          type:
            stage.PARENT_ID > 0 && linkStageNode
              ? "default"
              : parentNode || linkStageNode
              ? "input"
              : "output",
          data: {
            label: (
              <>
                <strong onClick={() => getCaseById(stage.STG_ID_PK)}>
                  {stage.STG_NUMBER} || {stage.STG_RESULT_NAME} || {stage.STG_TYPE_NAME} || {stage.OFC_NAME} || {stage.STG_KIND_NAME}
                </strong>
              </>
            ),
          },
          // parentNode: stage?.PARENT_ID ? stage?.PARENT_ID > 0 : null,([...new Set(parentsNum)].length )
          height: 40,
          width: 150,
          position:
            stage.PARENT_ID < 0 ||
            (!stage.PARENT_ID && stage.linkStages.length == 0)
              ? {
                  x:
                    parentsNum.indexOf(stage.STG_ID_PK) >= 0
                      ? (window.innerWidth / parentsNum.length) *
                        (parentsNum.indexOf(stage.STG_ID_PK) + 1)
                      : window.innerWidth / 2 + stages.indexOf(stage) * 180,
                  y: parentsNum.indexOf(stage.STG_ID_PK) >= 0 ? 80 : 0,
                }
              : stage.PARENT_ID > 0
              ? {
                  x:
                    (window.innerWidth / parentsNum.length) *
                    (parentsNum.indexOf(stage.PARENT_ID) + 1),
                  y:
                    // stage.PARENT_ID > 0 && stage.linkStages.length > 0
                    //   ? 500
                    //   :
                    100 + 85 * (stages.indexOf(stage)),
                }
              : {
                  x:
                    parentsNum.length > 0
                      ? window.innerWidth / parentsNum.length +
                        window.innerWidth / parentsNum.length / 2
                      : window.innerWidth / 3 +
                        (stages.indexOf(stage) - 1) * 180,
                  y:
                    parentsNum.length > 0
                      ? window.innerHeight / 2 -
                        stages.indexOf(stage) * 70 +
                        400
                      : !linkStageNode && stage.linkStages.length > 0
                      ? 450
                      : linkStageNode && stage.linkStages.length > 0
                      ? 550
                      : stage.PARENT_ID < 0 || !stage.PARENT_ID
                      ? 250
                      : 400,
                },
        });
        if (stage.PARENT_ID > 0) {
          // console.log(linkStageNode)
          links.push({
            id:
              // stage.PARENT_ID > 0 || stage.linkStages.length > 0
              //   ? `e${stage.PARENT_ID}-${stage.STG_ID_PK + 33}`
              //   :
              `e${stage.PARENT_ID}-${stage.STG_ID_PK}`,
            source: stage.PARENT_ID.toString(),
            target:
              // stage.PARENT_ID > 0 || stage.linkStages.length > 0
              //   ? `${stage.STG_ID_PK + 33}`
              //   :
              stage.STG_ID_PK.toString(),
            type: "straight",
            // label: `${stage.PARENT_ID} - ${stage.STG_ID_PK}- parent`,
            markerEnd: { type: MarkerType.ArrowClosed },
          });
        }
        // console.log(links, nodes)
        if (stage.linkStages.length > 0) {
          for (let stg of stage.linkStages) {
            links.push({
              id:
                stage.STG_ID_PK == linkStageNode
                  ? `e${stg.STG_ID_PK_LINK + 33}-${stg.STG_ID_PK + 33}`
                  : `e${stg.STG_ID_PK_LINK}-${stg.STG_ID_PK + 33}`,
              source: stg.STG_ID_PK_LINK.toString(),
              target: (stg.STG_ID_PK + 33).toString(),
              // label: "قضايا إرتباط",
              // animated: true,
              type: "straight",
              markerEnd: {
                type: MarkerType.Arrow,
              },
              style: { stroke: "#1e42a0" },
            });
          }
        }
        setEdges(links);
        setNodes(theAllNodes);
      }
    } else {
      return;
    }
  }, [theStages.length, allStages?.length]);
  // console.log(nodes, edges);

  const exitSelectModal = () => {
    setVisible(false);
    setItem(null);
  };

  let ReturnedPopup = null;
  ReturnedPopup = () => (
    <CModal visible={visible} onClose={() => exitSelectModal()}>
      <CModalHeader>
        <CModalTitle>
          <CIcon
            style={{ height: "20px" }}
            icon={cilLayers}
            customClassName="nav-icon"
          />
          {item ? <span>ملف رقم {item?.STG_NUMBER}</span> : null}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md={"6"}>
            <CRow>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">مقيمي القضيه</CFormLabel>
                <p>{item.FIL_SOURCE_NAME ? item.FIL_SOURCE_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">القضيه الإساسيه</CFormLabel>
                <p>{item?.PARENT_NAME ? item?.PARENT_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">قضايا الإرتباط </CFormLabel>
                {item
                  ? item?.LINKS?.map((link, index) => {
                      return (
                        <Link key={index} to="/link.STG_ID_PK">
                          {link.STG_NUMBER ? link.STG_NUMBER : "لا يوجد"}
                        </Link>
                      );
                    })
                  : null}
              </CCol>
              <CCol md={12}>
                <CRow>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputEmail4"> رقم القضيه</CFormLabel>
                    <p>{item?.CAS_NUMBER ? item?.CAS_NUMBER : "لا يوجد"}</p>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="inputEmail4"> السنه</CFormLabel>
                    <p>{item?.STG_YEAR ? item?.STG_YEAR : "لا يوجد"}</p>
                  </CCol>
                </CRow>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> تاريخ التسجيل</CFormLabel>
                <p>
                  {item?.CAS_OPEN_DATE
                    ? new Intl.DateTimeFormat("en-US").format(
                        new Date(item.CAS_OPEN_DATE)
                      )
                    : null}
                </p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> المرحله</CFormLabel>
                <p>{item.STG_KIND_NAME ? item.STG_KIND_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">الدائره</CFormLabel>
                <p>{item.OFC_NAME ? item.OFC_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">رقم البلاغ</CFormLabel>
                <p>{item.INR_NUMBER ? item.INR_NUMBER : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">نوع القضيه</CFormLabel>
                <p>{item.STG_TYPE_NAME ? item.STG_TYPE_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> المحكمه</CFormLabel>
                <p>{item.COU_NAME ? item.COU_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> فرع المحكمه</CFormLabel>
                <p>{item.COU_NAME ? item.COU_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> القاضي</CFormLabel>
                <p>{item.STG_JUDGE_NAME ? item.STG_JUDGE_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> متابع القضيه</CFormLabel>
                <p>{item.EMP_NAME ? item.EMP_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> حاله القضيه</CFormLabel>
                <p>{item.FIL_STATUS_NAME ? item.FIL_STATUS_NAME : "لا يوجد"}</p>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> نتيجه القضيه</CFormLabel>
                <p>{item.STG_RESULT_NAME ? item.STG_RESULT_NAME : "لا يوجد"}</p>
              </CCol>
            </CRow>
          </CCol>
          <CCol md={"6"}>
            <CRow>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">الموكلون</CFormLabel>
                {item ? (
                  <select className="mb-2 d-block">
                    {item?.clients?.map((client, index) => {
                      return (
                        <option key={index}>
                          {client.CLI_TYPE_NAME == "موكل" && client.CLI_NAME}
                        </option>
                      );
                    })}
                  </select>
                ) : null}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">الطرف الثانى</CFormLabel>
                {item?.clients ? (
                  <select className="mb-2 d-block">
                    {item?.clients?.map((client, index) => {
                      return (
                        <option key={index}>
                          {client?.CLI_TYPE_NAME == "خصم" && client?.CLI_NAME}
                        </option>
                      );
                    })}
                  </select>
                ) : null}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
                {item ? (
                  <p>{item.STG_NOTES ? item.STG_NOTES : "null"}</p>
                ) : null}
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={() => exitSelectModal()}
        >
          إغلاق
        </CButton>
      </CModalFooter>
    </CModal>
  );

  const getClickedBtn = (event, node) => {
    getCaseById(parseInt(node.id));
  };

  return (
    <div className="tree">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        elements={[nodes, edges]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        onNodeClick={getClickedBtn}
      >
        {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
        nodeBorderRadius={2}
      /> */}
        {/* <Controls /> */}
        <Background color="#999" gap={16} />
      </ReactFlow>
      {item ? ReturnedPopup(item) : null}
    </div>
  );
};

export default React.memo(Tree);

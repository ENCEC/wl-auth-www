// @formatter:off
/* eslint-disable */
import ModelExpression = ds.ModelExpression;
import FieldExpression = ds.FieldExpression;
import DaoServiceClient = ds.DaoServiceClient;

import SzFreight = ds.SzFreight;
import WaybillRouteNode = ds.WaybillRouteNode;
import WaybillInfo = ds.WaybillInfo;
import SbCust = ds.SbCust;
import Dept = ds.Dept;
import UserDeleteTest = ds.UserDeleteTest;
import UserExportTest = ds.UserExportTest;
import RpLedgerItem = ds.RpLedgerItem;
import CsCust = ds.CsCust;
import SbOffice = ds.SbOffice;
import StudentNew = ds.StudentNew;
import UserImportTest = ds.UserImportTest;
import BcFreight = ds.BcFreight;
import WaybillFee = ds.WaybillFee;
import SbCodedict = ds.SbCodedict;
import DictAreaInfoBak = ds.DictAreaInfoBak;
import ExportConfig = ds.ExportConfig;
import MdFreightCode = ds.MdFreightCode;
import Children = ds.Children;
import I18nMessages = ds.I18nMessages;
import Course = ds.Course;
import UserAddTest = ds.UserAddTest;
import UserUpdateTest = ds.UserUpdateTest;
import TimerVersion = ds.TimerVersion;
import SupportedLocale = ds.SupportedLocale;
import BcPublicOrder = ds.BcPublicOrder;
import Teacher = ds.Teacher;
import Student = ds.Student;
import RpPublicOrder = ds.RpPublicOrder;
import Shop = ds.Shop;
import Gift = ds.Gift;
import UserSelectTest = ds.UserSelectTest;
import Employee = ds.Employee;
import MdCodeDict = ds.MdCodeDict;
import GlVoucher = ds.GlVoucher;
import ImportConfig = ds.ImportConfig;
import AppNodes = ds.AppNodes;
import DictProductType = ds.DictProductType;
import MdGlobalBusiness = ds.MdGlobalBusiness;
import ChangeLog = ds.ChangeLog;
import DictAreaInfo = ds.DictAreaInfo;
import GtxTrans = ds.GtxTrans;

declare class QSzFreight extends ModelExpression<SzFreight, any> {
  /** 实际付款人-用于支付平台 */
  actualPayer: FieldExpression<string>;
  /** 用于区分代理费类别。0，本司代理费；1、总部分成代理费；2、港口方分成代理费 */
  agentcyFeeType: FieldExpression<string>;
  /** 申请支付币别 */
  agreementCurrency: FieldExpression<string>;
  /** 协议汇率-用于支付平台 */
  agreementRate: FieldExpression<number & string>;
  /** 已结算金额 */
  allocatedAmount: FieldExpression<number & string>;
  /** 核销单号 */
  allocationNo: FieldExpression<string>;
  /** 核销状态 1未核销 2部分核销 3已核销 */
  allocationStatus: FieldExpression<string>;
  /** 申请状态-用于支付平台：0=未申请，1=已申请 */
  applyStatus: FieldExpression<string>;
  /** 若是来源于报价，存放采购价ID */
  associatingCode: FieldExpression<string>;
  /** 审核标记 */
  audit: FieldExpression<number>;
  /** 费用审核批号（没用） */
  auditBatchno: FieldExpression<string>;
  auditKtl: FieldExpression<string>;
  /** 审核人ID */
  auditPerson: FieldExpression<string>;
  /** 审核人 */
  auditPersonName: FieldExpression<string>;
  /** 审核时间 */
  auditTime: FieldExpression<string>;
  blType: FieldExpression<string>;
  /** BMS费用ID */
  bmsId: FieldExpression<string>;
  /** 上传BMS时间 */
  bmsUpDate: FieldExpression<string>;
  /** 上传BMS标记：0未上传 1已上传 2上传中 */
  bmsUpFlag: FieldExpression<string>;
  /** 上传BMS人ID */
  bmsUpPerson: FieldExpression<string>;
  /** 业务日期 */
  businessDate: FieldExpression<string>;
  /** 业务类型 */
  businessTypeNo: FieldExpression<string>;
  /** 舱位公司 */
  carrierId: FieldExpression<string>;
  /** 流水号-用于支付平台 */
  cashMovementNo: FieldExpression<string>;
  /** 收费时间 */
  chargedDate: FieldExpression<string>;
  /** 计费重 */
  chargeWeight: FieldExpression<number & string>;
  cntCompany: FieldExpression<string>;
  /** 船代箱子费用自动计算的箱号 */
  cntNo: FieldExpression<string>;
  /** 若是来源于报价，存放销售价ID */
  codesales: FieldExpression<string>;
  /** 佣金ID（没用） */
  commisionId: FieldExpression<string>;
  commitTime: FieldExpression<string>;
  commitUserid: FieldExpression<string>;
  commitUsername: FieldExpression<string>;
  /** 账单ID */
  compId: FieldExpression<string>;
  /** 费用录入是否完成（没用） */
  completed: FieldExpression<number>;
  /** 操作录入完成时间（没用） */
  completeDate: FieldExpression<string>;
  /** 操作录入完成人（没用） */
  completePerson: FieldExpression<string>;
  /** 操作录入完成人姓名（没用） */
  completePersonName: FieldExpression<string>;
  /** 账单状态 */
  compStatus: FieldExpression<number>;
  confirmId: FieldExpression<string>;
  /** 确认单号 */
  confirmNo: FieldExpression<string>;
  /** 联系人-用于支付平台 */
  contactPerson: FieldExpression<string>;
  /** 箱型尺寸 */
  ctnSizeType: FieldExpression<string>;
  /** 客户ID */
  custId: FieldExpression<string>;
  /** 客户名称 */
  custName: FieldExpression<string>;
  /** 预计开票类型 */
  estimatedInvoiceType: FieldExpression<string>;
  /** 预估税金 */
  estimatedTaxes: FieldExpression<number & string>;
  /** 预估税率 */
  estimatedTaxRate: FieldExpression<number & string>;
  /** 兑换率 */
  exchangeRate: FieldExpression<number & string>;
  exportDate: FieldExpression<string>;
  exportFlag: FieldExpression<string>;
  exportOffice: FieldExpression<string>;
  exportPersion: FieldExpression<string>;
  /** 外部接入标志 */
  externalAccessSign: FieldExpression<string>;
  /** 公布金额（没用） */
  fileAmount: FieldExpression<number & string>;
  /** 业务费用表主键ID */
  freightId: FieldExpression<string>;
  /** 费率 */
  freightRate: FieldExpression<string>;
  /** 费用来源：1为批量模板导入，2为Excel导入，3未知，4未知，5为协议导入（航运） */
  freightSource: FieldExpression<string>;
  /** 费用导出 */
  frtExport: FieldExpression<number>;
  /** 费用ID */
  frtId: FieldExpression<string>;
  /** 费用细目标志,0表示代收代付,1表示收入 */
  frtMode: FieldExpression<string>;
  /** 费用名称 */
  frtName: FieldExpression<string>;
  /** 费用子类 */
  frtStype: FieldExpression<string>;
  /** 费用类型 */
  frtType: FieldExpression<string>;
  innerRpFreightId: FieldExpression<string>;
  /** 录入时间 */
  inputDate: FieldExpression<string>;
  /** 录入组织 */
  inputOffice: FieldExpression<string>;
  /** 录入人ID */
  inputPerson: FieldExpression<string>;
  /** 录入人 */
  inputPersonName: FieldExpression<string>;
  /** 录入角色（没用） */
  inputRole: FieldExpression<string>;
  /** 已开票金额 */
  invoiceAmount: FieldExpression<number & string>;
  /** 发票ID */
  invoiceId: FieldExpression<string>;
  /** 发票号 */
  invoiceNo: FieldExpression<string>;
  /** 开票状态 0:不开票 1:未开票 2:部分开票 3:已开票 4:已申请 */
  invoiceStatus: FieldExpression<string>;
  /** 是否现金 */
  isCash: FieldExpression<number>;
  isCharged: FieldExpression<number>;
  isCommit: FieldExpression<number>;
  /** 是否协议费用（没用） */
  isContract: FieldExpression<number>;
  /** 是否提单审核导出PEC001报文(电子支付) */
  isEdiEpayOut: FieldExpression<number>;
  /** 是否来源于报价 */
  isFromQuotedprice: FieldExpression<number>;
  /** 是否内配 */
  isInnerRp: FieldExpression<number>;
  /** 报关报检费导入标志 */
  isInput: FieldExpression<number>;
  isReplace: FieldExpression<number>;
  /** 是否同一套价格（采购价与销售价是否相同） */
  isSameprice: FieldExpression<number>;
  /** 是否结算 */
  isVirSettle: FieldExpression<number>;
  /** 是否箱贴：该类费用由航运付款新增时(结算单位是部门)，同步到海运付款 */
  isXt: FieldExpression<number>;
  /** 费用类型，N:一般费用 C:分配过来的费用 E:差价费用 A:代垫 F：代垫调整 B:差价费用 P:利润，当ITEM_TYPE = P时，RP_ID 的值固定为 P，M:佣金，当ITEM_TYPE = M时，RP_ID 的值固定为 R  */
  itemType: FieldExpression<string>;
  /** 业务主表ID */
  jobOrderId: FieldExpression<string>;
  /** 对应财务费用币别（没用） */
  ledgerCurrency: FieldExpression<string>;
  /** 报价币到财务费用币别的汇率（没用） */
  ledgerRate: FieldExpression<number & string>;
  /** 内部关联号（没用） */
  linkNo: FieldExpression<string>;
  /** 主单对应的FREIGHT_ID */
  masterItemId: FieldExpression<string>;
  /** 最后修改人 */
  modifyLastPerson: FieldExpression<string>;
  modifyLastTime: FieldExpression<string>;
  /** 是否需要分配（没用） */
  needAllocate: FieldExpression<number>;
  /** 是否需要审核（没用） */
  needAudit: FieldExpression<number>;
  /** 是否打印在提单上（没用） */
  needPrint: FieldExpression<number>;
  /** 部门 */
  officeDept: FieldExpression<string>;
  /** 对应业务的业务员ID */
  opId: FieldExpression<string>;
  /** 对应业务的业务员 */
  opName: FieldExpression<string>;
  /** 业务协同号 */
  orderNo: FieldExpression<string>;
  /** 付款编号 */
  paymentNo: FieldExpression<string>;
  /** 支付状态-用于支付平台：0=未支付，1=已支付 */
  payStatus: FieldExpression<string>;
  /** 付款条款 */
  payTerm: FieldExpression<string>;
  priceType: FieldExpression<string>;
  /** 数量 */
  quantity: FieldExpression<number>;
  /** 销售金额 */
  quoteAmount: FieldExpression<number & string>;
  /** 报价币别（没用） */
  quoteCurrency: FieldExpression<string>;
  /** 销售单价 */
  quoteUnitPrice: FieldExpression<number & string>;
  /** 结算币别到美金的汇率 */
  rateToUsd: FieldExpression<number & string>;
  /** 关联箱代费ID */
  reCntrFreightId: FieldExpression<string>;
  /** 船代的费用补差价关联的ID */
  reFreightId: FieldExpression<string>;
  /** 备注 */
  remark: FieldExpression<string>;
  /** 可请款金额 */
  requestableAmount: FieldExpression<number & string>;
  /** 请款金额 */
  requestAmount: FieldExpression<number & string>;
  /** 请款单ID */
  requestId: FieldExpression<string>;
  /** 请款单号 */
  requestNo: FieldExpression<string>;
  /** 请款状态 */
  requestStatus: FieldExpression<string>;
  /** 代理账单ID */
  reSettlementId: FieldExpression<string>;
  /** 收付标志 */
  rpId: FieldExpression<string>;
  /** 对应为业务单的录入人（没用） */
  rpPerson: FieldExpression<string>;
  /** 对应为业务单的录入人姓名（没用） */
  rpPersonName: FieldExpression<string>;
  /** 代收代付互相关联用，收款存对应的付款费用ID，付款存对应的收款费用ID */
  rpRelationId: FieldExpression<string>;
  rpStauts: FieldExpression<number>;
  /** 销售金额 */
  salesAmount: FieldExpression<number & string>;
  /** 销售币别 */
  salesCurrency: FieldExpression<string>;
  /** 对应业务的业务员组织 */
  salesoffice: FieldExpression<string>;
  /** 销售单价 */
  salesUnitPrice: FieldExpression<number & string>;
  /** 结算金额 */
  settleAmount: FieldExpression<number & string>;
  /** 结算币别 */
  settleCurrency: FieldExpression<string>;
  /** 结算公司 */
  settleOffice: FieldExpression<string>;
  /** 结算地点（没用） */
  settlePlace: FieldExpression<string>;
  /** 下级关键ID */
  subKeyId: FieldExpression<string>;
  /** 业务系统 */
  systemNo: FieldExpression<string>;
  /** 税金计算公式 */
  taxFormula: FieldExpression<string>;
  testCount: FieldExpression<string>;
  /** 时间戳 */
  timestamp: FieldExpression<number>;
  /** 交易日期-用于支付平台 */
  transactionDate: FieldExpression<string>;
  /** 交易号-用于支付平台 */
  transactionOrderNo: FieldExpression<string>;
  /** 计费单位 */
  unit: FieldExpression<string>;
  uniteNo: FieldExpression<string>;
  /** 单价 */
  unitPrice: FieldExpression<number & string>;
  /** 有效日期-用于支付平台 */
  validDate: FieldExpression<string>;
  vesselAgencyId: FieldExpression<string>;
  /** 虚拟发票号 */
  virInvoiceNo: FieldExpression<string>;
  /** 结算币别到本位币的汇率 */
  xchgRate: FieldExpression<number & string>;
  /** 箱贴费用关联ID，航运和海运互相保存对方费用ID */
  xtFreightId: FieldExpression<string>;
  using(client: DaoServiceClient): QSzFreight;
}

declare class QWaybillRouteNode extends ModelExpression<
  WaybillRouteNode,
  number
> {
  /** 路由节点编号 */
  waybillRouteNodeId: FieldExpression<number>;
  /** 路由节点到达站点名称 */
  arrivalSiteName: FieldExpression<string>;
  /** 节点在路由中的序号 */
  siteNum: FieldExpression<number>;
  /** 路由节点开始物流站点名称 */
  startingSiteName: FieldExpression<string>;
  /** 运单编号 */
  waybillId: FieldExpression<number>;
  using(client: DaoServiceClient): QWaybillRouteNode;
}

declare class QWaybillInfo extends ModelExpression<WaybillInfo, number> {
  /** 运单号 */
  waybillId: FieldExpression<number>;
  collectDatetime: FieldExpression<string>;
  /** 揽件人姓名 */
  collectEmployeeCname: FieldExpression<string>;
  /** 揽收员工编号 */
  collectEmployeeId: FieldExpression<number>;
  /** 揽件人手机 */
  collectEmployeeMobile: FieldExpression<string>;
  /** 收货人姓名 */
  consigneeCname: FieldExpression<string>;
  /** 收货人手机号码 */
  consigneeMobile: FieldExpression<string>;
  /** 收货地址详情 */
  deliveryAddressDetail: FieldExpression<string>;
  /** 收货地区编号 */
  deliveryAreaCode: FieldExpression<string>;
  /** 货物类型编号 */
  productTypeCode: FieldExpression<string>;
  /** 发货人详址 */
  sendAddressDetail: FieldExpression<string>;
  /** 发货地区编号 */
  sendAreaCode: FieldExpression<string>;
  /** 发货人中文姓名 */
  shipperCname: FieldExpression<string>;
  /** 发货人手机号码 */
  shipperMobile: FieldExpression<string>;
  waybillFee: QWaybillFee;
  waybillRouteNodes: QWaybillRouteNode;
  using(client: DaoServiceClient): QWaybillInfo;
}

declare class QSbCust extends ModelExpression<SbCust, any> {
  /** 是否可用 */
  active: FieldExpression<number>;
  /** 地址 */
  addr: FieldExpression<string>;
  /** 中文地址 */
  addrNative: FieldExpression<string>;
  /** 转正申请时间 */
  applicationFormalDate: FieldExpression<string>;
  /** 转正申请人 */
  applicationFormalUser: FieldExpression<string>;
  /** 转正申请人 */
  applicationFormalUserName: FieldExpression<string>;
  /** 转费用申请时间 */
  applicationFrtDate: FieldExpression<string>;
  /** 转费用申请人 */
  applicationFrtUser: FieldExpression<string>;
  /** 转费用申请人 */
  applicationFrtUserName: FieldExpression<string>;
  /** 对应的正式客户ID */
  approvedCustId: FieldExpression<string>;
  /** 对应的正式客户名称 */
  approvedCustName: FieldExpression<string>;
  /** 所属货运组织 */
  belongFreight: FieldExpression<string>;
  /** 单证打印内容 */
  blContent: FieldExpression<string>;
  /** 提单号前缀校验 */
  blPrefix: FieldExpression<string>;
  businessNature: FieldExpression<string>;
  /** 城市 */
  cityId: FieldExpression<string>;
  /** 城市名称 */
  cityName: FieldExpression<string>;
  /** 催收人ID */
  collectionPersonId: FieldExpression<string>;
  /** 催收人NAME */
  collectionPersonName: FieldExpression<string>;
  /** 联系人信息 */
  contact: FieldExpression<string>;
  /** 国家 */
  countryId: FieldExpression<string>;
  /** 允许的欠款额度 */
  creditAmt: FieldExpression<number & string>;
  /** 允许的欠款币别 */
  creditCurrency: FieldExpression<string>;
  /** 欠款的信用期限 */
  creditDays: FieldExpression<number>;
  /** 失效日期 */
  creditInvalidationDate: FieldExpression<string>;
  /** 协议号 */
  creditNo: FieldExpression<string>;
  /** 备注 */
  creditRemark: FieldExpression<string>;
  /** 信用等级 */
  creditType: FieldExpression<string>;
  /** 客户简称 */
  custAlias: FieldExpression<string>;
  /** 客户中文简称 */
  custAliasCn: FieldExpression<string>;
  /** 主键ID */
  custId: FieldExpression<string>;
  /** 客户内外标志 */
  custInnerOuter: FieldExpression<string>;
  /** 客户名称 */
  custName: FieldExpression<string>;
  /** 客户中文名称 */
  custNameNative: FieldExpression<string>;
  /** 该客户在海关的编号 */
  customsNo: FieldExpression<string>;
  /** 客户类型 */
  custType: FieldExpression<number>;
  /** 删除标志 */
  deleted: FieldExpression<number>;
  /** 删除原因 */
  deletedReason: FieldExpression<number>;
  /** 拖箱地 */
  dragCtnPlace: FieldExpression<string>;
  /** 欠款类型 */
  dueType: FieldExpression<string>;
  /** 该客户的在EDI中的编码 */
  ediCode: FieldExpression<string>;
  /** 客户标准编号 */
  ein: FieldExpression<string>;
  /** EMail */
  email: FieldExpression<string>;
  /** 中止往来日期 */
  endDate: FieldExpression<string>;
  /** 传真 */
  fax: FieldExpression<string>;
  /** 外代代码2 */
  forward2Code: FieldExpression<string>;
  /** 外代代码 */
  forwardCode: FieldExpression<string>;
  /** 客户级别 */
  grade: FieldExpression<string>;
  /** 电子商务主页 */
  homepage: FieldExpression<string>;
  /** 扩展字段 */
  idstring1: FieldExpression<string>;
  /** 扩展字段 */
  idstring2: FieldExpression<string>;
  /** 扩展字段 */
  idstring3: FieldExpression<string>;
  /** 录入时间 */
  inputDate: FieldExpression<string>;
  /** 录入办事处 */
  inputOffice: FieldExpression<string>;
  /** 录入人办事处 */
  inputOfficeCode: FieldExpression<string>;
  /** 录入角色 */
  inputRole: FieldExpression<string>;
  /** 录入人 */
  inputUser: FieldExpression<string>;
  /** 录入人姓名 */
  inputUserName: FieldExpression<string>;
  /** 发票地址 */
  invAddr: FieldExpression<string>;
  /** 发票名称 */
  invTitle: FieldExpression<string>;
  /** 差额开票 */
  isCeInv: FieldExpression<number>;
  isCheckOrderOnline: FieldExpression<number>;
  /** EDO服务 */
  isEdo: FieldExpression<number>;
  /** 是否有电子商务 */
  isOnline: FieldExpression<number>;
  /** 货代二程船公司 */
  isOoCarrier2: FieldExpression<number>;
  /** 是否利润 */
  isProfit: FieldExpression<number>;
  /** 是否商务平台客户 */
  isShowIzCust: FieldExpression<number>;
  /** 该客户的在财务系统中的编码 */
  ledgerCode: FieldExpression<string>;
  /** 扩展字段 */
  logic1: FieldExpression<string>;
  /** 扩展字段 */
  logic2: FieldExpression<string>;
  /** 电子商务登录名 */
  loginName: FieldExpression<string>;
  /** 客商类型 */
  mdgBuGroup: FieldExpression<string>;
  /** 传真分号 */
  mdgFaxExtens: FieldExpression<string>;
  /** 语言 */
  mdgLangu: FieldExpression<string>;
  /** 手机 */
  mdgMobNumber: FieldExpression<string>;
  /** 客商编码 */
  mdgPartner: FieldExpression<string>;
  /** 地区 */
  mdgRegion: FieldExpression<string>;
  /** 电话分号 */
  mdgTelExtens: FieldExpression<string>;
  /** 最后一场修改人名称 */
  modidyUserName: FieldExpression<string>;
  /** 最后一次修改时间 */
  modifyDate: FieldExpression<string>;
  /** 最后修改时间 */
  modifyLastTime: FieldExpression<string>;
  /** 最后一次修改人 */
  modifyUser: FieldExpression<string>;
  /** 需要货物跟踪 */
  needCargoTracking: FieldExpression<number>;
  /** 电子商务登录口令 */
  pwd: FieldExpression<string>;
  registeredCapital: FieldExpression<number & string>;
  /** 相关业务员 */
  relateBussinessUser: FieldExpression<string>;
  /** 相关办事处 */
  relatedOffice: FieldExpression<string>;
  /** 相关用户 */
  relateUser: FieldExpression<string>;
  /** 备注 */
  remarkD: FieldExpression<string>;
  /** 客户助记码 */
  remCode: FieldExpression<string>;
  /** 开始往来日期 */
  startDate: FieldExpression<string>;
  /** 省份 */
  stateId: FieldExpression<string>;
  /** 客户状态 */
  status: FieldExpression<string>;
  /** 上级客户ID */
  superiorId: FieldExpression<string>;
  /** 上级客户ID串 */
  superiorIdList: FieldExpression<string>;
  /** 上级客户名称 */
  superiorName: FieldExpression<string>;
  taxNumber: FieldExpression<string>;
  /** 税务登记号 */
  taxRegisterNo: FieldExpression<string>;
  /** 电话 */
  tel: FieldExpression<string>;
  /** 失效原因 */
  unactive: FieldExpression<string>;
  /** VIP客户类型 */
  vip: FieldExpression<string>;
  /** 网上服务协议终止日期 */
  webProtocolEndDate: FieldExpression<string>;
  /** 网上服务协议号 */
  webProtocolNo: FieldExpression<string>;
  /** 邮政编码 */
  zip: FieldExpression<string>;
  using(client: DaoServiceClient): QSbCust;
}

declare class QDept extends ModelExpression<Dept, number> {
  deptId: FieldExpression<number>;
  deptName: FieldExpression<string>;
  principalGroupCode: FieldExpression<string>;
    information: FieldExpression<object>;
    longTextTest: FieldExpression<string>;
    textTest: FieldExpression<string>;
  employees: QEmployee;
  using(client: DaoServiceClient): QDept;
}

declare class QUserDeleteTest extends ModelExpression<UserDeleteTest, number> {
  id: FieldExpression<number>;
  password: FieldExpression<string>;
  username: FieldExpression<string>;
  using(client: DaoServiceClient): QUserDeleteTest;
}

declare class QUserExportTest extends ModelExpression<UserExportTest, number> {
  id: FieldExpression<number>;
  password: FieldExpression<string>;
  username: FieldExpression<string>;
  using(client: DaoServiceClient): QUserExportTest;
}

declare class QRpLedgerItem extends ModelExpression<RpLedgerItem, string> {
  /** 主键ID */
  ledgerItemId: FieldExpression<string>;
  /** 会计分录ID */
  accountDissectionId: FieldExpression<string>;
  /** 实际本位币金额 */
  actualBaseCurrencyValue: FieldExpression<number & string>;
  /** 实际开票类型 */
  actualInvoiceType: FieldExpression<string>;
  /** 实际本位币汇率 */
  actualRateBase: FieldExpression<number & string>;
  /** 实际税金 */
  actualTaxes: FieldExpression<number & string>;
  /** 实际税率 */
  actualTaxRate: FieldExpression<number & string>;
  /** 可冲账本位币金额 */
  allocableBaseCurrencyValue: FieldExpression<number & string>;
  /** 可冲账原币金额 */
  allocablePrimeCurrencyValue: FieldExpression<number & string>;
  /** 可冲账标准币金额 */
  allocableUsdValue: FieldExpression<number & string>;
  /** 已冲账本位币金额 */
  allocatedBaseCurrencyValue: FieldExpression<number & string>;
  /** 已冲账原币金额 */
  allocatedPrimeCurrencyValue: FieldExpression<number & string>;
  /** 已冲账标准币金额 */
  allocatedUsdValue: FieldExpression<number & string>;
  /** 核销单号 */
  allocationNo: FieldExpression<string>;
  /** 本位币 */
  applyBaseCurrencyCode: FieldExpression<string>;
  /** 本位币金额 */
  applyBaseCurrencyValue: FieldExpression<number & string>;
  /** 原币 */
  applyPrimeCurrencyCode: FieldExpression<string>;
  /** 原币金额 */
  applyPrimeCurrencyValue: FieldExpression<number & string>;
  /** 标准币金额 */
  applyUsdValue: FieldExpression<number & string>;
  /** 批复金额（本位币） */
  approveBaseValue: FieldExpression<number & string>;
  /** 批复金额（原币） */
  approvePrimeValue: FieldExpression<number & string>;
  /** 批复状态 */
  approveStatus: FieldExpression<string>;
  /** 批复金额（美金） */
  approveUsdValue: FieldExpression<number & string>;
  /** 差价或佣金所对应的费用ID */
  balanceTo: FieldExpression<string>;
  /** 业务系统的业务日期 */
  businessDate: FieldExpression<string>;
  /** 业务系统的编号 */
  businessId: FieldExpression<string>;
  cashMovementId: FieldExpression<string>;
  /** 冲帐结束时间 */
  closeDate: FieldExpression<string>;
  /** 催款单日期 */
  collectBillDate: FieldExpression<string>;
  /** 催款单ID */
  collectBillId: FieldExpression<string>;
  /** 是否包含在催款单中 */
  collectFlag: FieldExpression<number>;
  /** 佣金金额 */
  commissinAmount: FieldExpression<number & string>;
  /** 佣金所占此费用金额的百分比 */
  commissionRate: FieldExpression<number & string>;
  /** 对账日期 */
  compDate: FieldExpression<string>;
  /** 对账单ID */
  compId: FieldExpression<string>;
  /** 对应为费用的完成日期 */
  completeDate: FieldExpression<string>;
  /** 对应为费用的完成人 */
  completePerson: FieldExpression<string>;
  /** 对应为费用的完成人姓名 */
  completePersonName: FieldExpression<string>;
  /** 对帐单号 */
  compNo: FieldExpression<string>;
  /** 总帐科目 */
  controlGlCoaCode: FieldExpression<string>;
  /** 业务描述 */
  description: FieldExpression<string>;
  /** 催款单文件号 */
  documentLocationReference: FieldExpression<string>;
  /** 还款截止日 */
  dueDate: FieldExpression<string>;
  /** 预计开票类型 */
  estimatedInvoiceType: FieldExpression<string>;
  /** 预估税金 */
  estimatedTaxes: FieldExpression<number & string>;
  /** 预估税率 */
  estimatedTaxRate: FieldExpression<number & string>;
  /** 账单客户对应的外部财务编码 */
  externalPartnerCode: FieldExpression<string>;
  /** 账单客户对应的外部财务名称 */
  externalPartnerName: FieldExpression<string>;
  /** 会计期间 */
  fiscalPeriod: FieldExpression<string>;
  /** 对应为费用的录入日期 */
  freightInputDate: FieldExpression<string>;
  /** 对应为费用的录入人 */
  freightInputPerson: FieldExpression<string>;
  /** 对应为费用的录入人姓名 */
  freightInputPersonName: FieldExpression<string>;
  /** 挂账时凭证辅助账的业务编号 */
  glArpBusinessNo: FieldExpression<string>;
  /** 挂账时凭证分录的科目代码 */
  glArpCoaCode: FieldExpression<string>;
  /** 挂账会计期间 */
  glArpFiscalPeriod: FieldExpression<string>;
  /** 挂账凭证的凭证ID */
  glArpVoucherId: FieldExpression<string>;
  /** 转收入成本时凭证辅助账的业务编号 */
  glCostBusinessNo: FieldExpression<string>;
  /** 转收入成本时凭证分录的科目代码 */
  glCostCoaCode: FieldExpression<string>;
  /** 转收入成本会计期间 */
  glCostFiscalPeriod: FieldExpression<string>;
  /** 转收入成本凭证的凭证ID */
  glCostVoucherId: FieldExpression<string>;
  /** 本位币汇率 */
  glRateBase: FieldExpression<number & string>;
  /** 美金汇率 */
  glRateUsd: FieldExpression<number & string>;
  glTaxBusinessNo: FieldExpression<string>;
  /** 税差挂账区间 */
  glTaxFiscalPeriod: FieldExpression<string>;
  /** 税差挂账ID */
  glTaxVoucherId: FieldExpression<string>;
  /** 是否包含佣金 */
  includeCommission: FieldExpression<number>;
  /** 费用审核批号 */
  inputBatchNo: FieldExpression<string>;
  /** 对应业务费用的审核日期 */
  inputDate: FieldExpression<string>;
  /** 对应为业务费用的审核办事处 */
  inputOffice: FieldExpression<string>;
  /** 对应为业务费用的审核人 */
  inputPerson: FieldExpression<string>;
  /** 对应为业务费用的审核人姓名 */
  inputPersonName: FieldExpression<string>;
  /** 录入角色 */
  inputRole: FieldExpression<string>;
  /** 已开票本位币金额 */
  invoiceBaseValue: FieldExpression<number & string>;
  /** 发票号 */
  invoiceNo: FieldExpression<string>;
  /** 已开票原币金额 */
  invoicePrimeValue: FieldExpression<number & string>;
  /** 开票状态 */
  invoiceStatus: FieldExpression<string>;
  /** 已开票标准币金额 */
  invoiceUsdValue: FieldExpression<number & string>;
  /** 是否是现金 */
  isCash: FieldExpression<number>;
  /** 是否内部往来帐 */
  isInternal: FieldExpression<number>;
  /** 是否手工登记 */
  isManual: FieldExpression<number>;
  /** 是否税差 */
  isTaxDifference: FieldExpression<number>;
  /** 费用类型，N:一般费用 C:分配过来的费用 E:差价费用 A:代垫 F：代垫调整 B:差价费用 P:利润，当ITEM_TYPE = P时，RP_ID 的值固定为 P，M:佣金，当ITEM_TYPE = M时，RP_ID 的值固定为 R  */
  itemType: FieldExpression<string>;
  /** 账单状态 */
  ledgerItemStateInd: FieldExpression<number>;
  /** 业务费用的结算客户 */
  ledgerPartnerCode: FieldExpression<string>;
  /** 业务费用的结算客户名称 */
  ledgerPartnerName: FieldExpression<string>;
  /** 账单类型 */
  ledgerTypeCode: FieldExpression<string>;
  /** 内部业务连接号 */
  linkNo: FieldExpression<string>;
  /** 最后修改时间 */
  modifyLastTime: FieldExpression<string>;
  /** 负责办事处 */
  officeId: FieldExpression<string>;
  /** 对应为业务的销售人员 */
  opId: FieldExpression<string>;
  /** 对应为业务的销售人员姓名 */
  opName: FieldExpression<string>;
  /** 公共订单号 */
  orderNo: FieldExpression<string>;
  /** 付款条款 */
  payTerm: FieldExpression<string>;
  /** 相关连的应收费用ID */
  relatedArId: FieldExpression<string>;
  /** 请款金额（本位币） */
  requestedBaseValue: FieldExpression<number & string>;
  /** 请款金额（原币） */
  requestedPrimeValue: FieldExpression<number & string>;
  /** 请款金额（美金） */
  requestedUsdValue: FieldExpression<number & string>;
  /** 请款单号 */
  requestNo: FieldExpression<string>;
  /** 请款状态 */
  requestStatus: FieldExpression<string>;
  /** 代理账单ID */
  reSettlementId: FieldExpression<string>;
  /** 费用ID */
  rpFrtId: FieldExpression<string>;
  /** 费用名称 */
  rpFrtName: FieldExpression<string>;
  /** 费用子类 */
  rpFrtStype: FieldExpression<string>;
  /** 费用类型 */
  rpFrtType: FieldExpression<string>;
  /** 收付标志 */
  rpId: FieldExpression<string>;
  /** 对应为业务单的录入人员 */
  rpPerson: FieldExpression<string>;
  /** 对应为业务单的录入人员姓名 */
  rpPersonName: FieldExpression<string>;
  rpStauts: FieldExpression<number>;
  /** 对应为业务销售办事处 */
  salesoffice: FieldExpression<string>;
  /** 结算备注 */
  settlementRemarks: FieldExpression<string>;
  /** 来源ID */
  sourceId: FieldExpression<string>;
  /** 来源类型 */
  sourceType: FieldExpression<string>;
  /** 帐单子类型 */
  subTypeCode: FieldExpression<string>;
  /** 帐单子类型2 */
  subTypeCode2: FieldExpression<string>;
  /** 业务类型 */
  systemType: FieldExpression<string>;
  /** 税金计算公式 */
  taxFormula: FieldExpression<string>;
  using(client: DaoServiceClient): QRpLedgerItem;
}

declare class QCsCust extends ModelExpression<CsCust, number> {
  /** 物理主键
   */
  csCustId: FieldExpression<number>;
  /** 有效标志 */
  active: FieldExpression<string>;
  /** 中文地址
   */
  addrCn: FieldExpression<string>;
  /** 英文地址 */
  addrEn: FieldExpression<string>;
  /** 工商注册号（对应主数据营业执照注册码）
administration for industry and commerce 工商局
 */
  aicRegisteredNo: FieldExpression<string>;
  /** (字段作废) */
  bizCsCustId: FieldExpression<string>;
  /** (字段作废) */
  bizSystemType: FieldExpression<string>;
  /** 客户主数据代码 CDH(common data HUB) */
  cdhCode: FieldExpression<string>;
  /** CDH限额 */
  cdhMaximum: FieldExpression<string>;
  /** 城市
   */
  cityCode: FieldExpression<string>;
  /** 城市名 */
  cityName: FieldExpression<string>;
  /** 组织机构代码（对应主数据组织机构证代码） */
  clientNo: FieldExpression<string>;
  /** 国家
   */
  countryCode: FieldExpression<string>;
  /** 国家名称（中文） */
  countryNameCn: FieldExpression<string>;
  /** 创建人所属组织 */
  createOffice: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  createTimeZone: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 是否客户 */
  csFlag: FieldExpression<string>;
  /** 中文简称
   */
  custAlias: FieldExpression<string>;
  /** 客商编码（需校验唯一性） */
  custCode: FieldExpression<string>;
  /** 中文全称
   */
  custNameCn: FieldExpression<string>;
  /** 英文全称 */
  custNameEn: FieldExpression<string>;
  /** 内部组织代码 */
  custOfficeCode: FieldExpression<string>;
  /** 内部组织名称 */
  custOfficeName: FieldExpression<string>;
  /** 海关注册代码 */
  customesRegisteredNo: FieldExpression<string>;
  /** 客户状态： 1、临时客户 2、正式客户 */
  custStatus: FieldExpression<string>;
  /** 客户类型(（内部组织I、外部组织O） */
  custType: FieldExpression<string>;
  /** 默认收款条件（暂不使用） */
  defaultCollectionTerm: FieldExpression<string>;
  /** 默认付款条件（暂不使用） */
  defaultPaymentTerm: FieldExpression<string>;
  /** 邮箱 */
  email: FieldExpression<string>;
  /** 失效日期 */
  expiryDate: FieldExpression<string>;
  /** 传真 */
  fax: FieldExpression<string>;
  /** 法人代表 */
  fictitiousPerson: FieldExpression<string>;
  /** 导入备注 */
  importRemark: FieldExpression<string>;
  /** 失效人 */
  invalidName: FieldExpression<string>;
  /** 失效时间 */
  invalidTime: FieldExpression<string>;
  /** 开票限额 */
  invoiceMaximum: FieldExpression<string>;
  /** 商检注册代码 */
  iqbRegisteredNo: FieldExpression<string>;
  /** Y/N */
  isDeleted: FieldExpression<string>;
  /** 一次性客商
Y:是
N:否 */
  isOneTimeCustomers: FieldExpression<string>;
  /** 是否结算对象
Y:是
N:否 */
  isSettlement: FieldExpression<string>;
  /** 最后修改人所属组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 最后修改人 */
  lastModifyor: FieldExpression<string>;
  /** 最后修改时间 */
  lastModifyTime: FieldExpression<string>;
  lastModifyTimeZone: FieldExpression<string>;
  /** 行业类别 */
  lndustryType: FieldExpression<string>;
  /** MDG客商编码 */
  mdgCustCode: FieldExpression<string>;
  /** 助记码（记录船货代助记码） */
  memoryCode: FieldExpression<string>;
  /** 手机 */
  mobileNo: FieldExpression<string>;
  /** 所有制信息（国有企业、民营企业、三资企业、非营业组织机构、自然人） */
  ownership: FieldExpression<string>;
  principalGroupCode: FieldExpression<string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 恢复日期 */
  recoveryDate: FieldExpression<string>;
  /** 注册资本 */
  registeredCapitqal: FieldExpression<string>;
  /** 注册时间 */
  registeredDate: FieldExpression<string>;
  /** 注册时间 */
  registeredTime: FieldExpression<string>;
  /** 备注 */
  remarks: FieldExpression<string>;
  /** 销售渠道 */
  salesChannels: FieldExpression<string>;
  /** 规模（单个公司、员工型、一次性、全国、区域） */
  scale: FieldExpression<string>;
  /** 结算对象 */
  settleCustCode: FieldExpression<string>;
  /** 结算对象名称 */
  settleCustName: FieldExpression<string>;
  /** 股份比例 */
  stakeProportion: FieldExpression<string>;
  /** 股份关系 */
  stakeRelation: FieldExpression<string>;
  /** 省份/州（编码） */
  stateCode: FieldExpression<string>;
  /** 省份/州（名称） */
  stateName: FieldExpression<string>;
  /** 行业子类（取自数据字典）（暂不使用） */
  subLndustryType: FieldExpression<string>;
  /** 是否供应商 */
  supplierFlag: FieldExpression<string>;
  /** 课税性质（一般纳税人、小规模纳税人） */
  taxNature: FieldExpression<string>;
  /** 纳税人识别号（对应主数据税务登记证代码） */
  taxpayerIdentificatioNo: FieldExpression<string>;
  tel: FieldExpression<string>;
  /** 类别 */
  type: FieldExpression<string>;
  /** 统一信用代码（对应主数据的企业注册码） */
  unifiedCreditNo: FieldExpression<string>;
  /** 供应商主数据代码 */
  vCdhCode: FieldExpression<string>;
  /** 邮政编码
   */
  zip: FieldExpression<string>;
  using(client: DaoServiceClient): QCsCust;
}

declare class QSbOffice extends ModelExpression<SbOffice, any> {
  /** 简称 */
  abbrev: FieldExpression<string>;
  /** 是否可用 */
  active: FieldExpression<number>;
  /** 地址 */
  address: FieldExpression<string>;
  /** 是否自动产生往来帐 */
  autoInternal: FieldExpression<number>;
  /** 打印在提单上的内容 */
  blContent: FieldExpression<string>;
  /** 工商登记号 */
  businessRegisterNo: FieldExpression<string>;
  /** 所在城市 */
  cityId: FieldExpression<string>;
  /** 城市名称 */
  cityName: FieldExpression<string>;
  /** 所属公司的OFFICE_ID */
  companyId: FieldExpression<string>;
  /** 联系人 */
  contactId: FieldExpression<string>;
  /** 所在国家 */
  countryId: FieldExpression<string>;
  /** 对应的客户ID */
  custId: FieldExpression<string>;
  /** 删除标志 */
  deleted: FieldExpression<number>;
  /** EMail */
  email: FieldExpression<string>;
  /** 传真 */
  fax: FieldExpression<string>;
  /** Office功能 */
  functionType: FieldExpression<string>;
  /** 本位币 */
  homeCurrency: FieldExpression<string>;
  /** 输入办事处 */
  inputOffice: FieldExpression<string>;
  /** 输入人 */
  inputUser: FieldExpression<string>;
  /** 输入人姓名 */
  inputUserName: FieldExpression<string>;
  /** 此办事处是否作为客户处理 */
  isCustomer: FieldExpression<number>;
  /** 是否为部门 */
  isDept: FieldExpression<number>;
  /** 是否为内部办事处 */
  isInternal: FieldExpression<number>;
  /** 是否为结算实体 */
  isSettlementObj: FieldExpression<number>;
  /** 所用的语言 */
  language: FieldExpression<string>;
  /** 最后修改时间 */
  modifyLastTime: FieldExpression<string>;
  /** 办事处代码 */
  officeCode: FieldExpression<string>;
  /** 主键ID */
  officeId: FieldExpression<string>;
  /** 办事处名称 */
  officeName: FieldExpression<string>;
  /** 办事处中文名称 */
  officeNativeName: FieldExpression<string>;
  /** ID字符串 */
  officeRelactionTag: FieldExpression<string>;
  /** OFFICE类型 */
  officeType: FieldExpression<string>;
  /** 结算办事处 */
  settleOffice: FieldExpression<string>;
  /** 上级办事处ID */
  superiorOfficeId: FieldExpression<string>;
  /** 税务登记号 */
  taxRegisterNo: FieldExpression<string>;
  /** 电话 */
  tel: FieldExpression<string>;
  /** 是否自动产生账单 */
  useSystem: FieldExpression<number>;
  /** 使用的汇率体系 */
  xchgrName: FieldExpression<string>;
  /** 实体/虚体 */
  zsjEntityEmpty: FieldExpression<string>;
  /** 主数据ID */
  zsjOfficeId: FieldExpression<string>;
  /** 主数据中组织机构内码 */
  zsjOfficeSid: FieldExpression<string>;
  using(client: DaoServiceClient): QSbOffice;
}

declare class QStudentNew extends ModelExpression<StudentNew, number> {
  /** 学生id */
  id: FieldExpression<number>;
  address: FieldExpression<string>;
  /** 学生年龄 */
  age: FieldExpression<number>;
  /** 出生日期 */
  birthday: FieldExpression<string>;
  /** 确认密码 */
  confirmPassword: FieldExpression<string>;
  /** 课程ID */
  courseId: FieldExpression<number>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 邮箱 */
  email: FieldExpression<string>;
  /** 入学日期 */
  enrollment: FieldExpression<string>;
  /** 移动电话 */
  mobile: FieldExpression<string>;
  /** 修改人 */
  modifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 学费 */
  money: FieldExpression<number>;
  /** 学生姓名 */
  name: FieldExpression<string>;
  /** 密码 */
  password: FieldExpression<string>;
  /** 分数 */
  score: FieldExpression<number>;
  /** 学生性别 */
  sex: FieldExpression<string>;
  /** 老师ID */
  teacherId: FieldExpression<number>;
  /** 乐观锁 */
  version: FieldExpression<number>;
  using(client: DaoServiceClient): QStudentNew;
}

declare class QUserImportTest extends ModelExpression<UserImportTest, number> {
  id: FieldExpression<number>;
  password: FieldExpression<string>;
  username: FieldExpression<string>;
  using(client: DaoServiceClient): QUserImportTest;
}

declare class QBcFreight extends ModelExpression<BcFreight, number> {
  /** 业务费用表主键ID */
  bcFreightId: FieldExpression<number>;
  /** 实际开票本位币金额 */
  actualBaseCurrencyValue: FieldExpression<number & string>;
  /** 实际开票类型 */
  actualInvoiceType: FieldExpression<string>;
  /** 实际开票本位币汇率 */
  actualRateBase: FieldExpression<number & string>;
  /** 实际付款对象编码 */
  actualSettleCustCode: FieldExpression<string>;
  /** 实际付款对象 */
  actualSettleCustName: FieldExpression<string>;
  /** 实际开票税金 */
  actualTaxes: FieldExpression<number & string>;
  /** 实际开票税率 */
  actualTaxRate: FieldExpression<number & string>;
  /** 预计付款日期 */
  agreedPaymentDate: FieldExpression<string>;
  /** 申请支付币别 */
  agreementCurrencyCode: FieldExpression<string>;
  /** 协议号（BMS不关注） */
  agreementNo: FieldExpression<string>;
  /** 协议汇率 */
  agreementRate: FieldExpression<number & string>;
  /** 可核销本位币金额 */
  allocableBaseCurrencyValue: FieldExpression<number & string>;
  /** 可核销原币金额 */
  allocablePrimeCurrencyValue: FieldExpression<number & string>;
  /** 已核销本位币金额 */
  allocatedBaseCurrencyValue: FieldExpression<number & string>;
  /** 已核销原币金额 */
  allocatedPrimeCurrencyValue: FieldExpression<number & string>;
  /** 核销时间 */
  allocationDate: FieldExpression<string>;
  /** 核销汇率 */
  allocationExchangeRate: FieldExpression<number & string>;
  /** 核销号 */
  allocationNo: FieldExpression<string>;
  /** 核销状态；N未核销，P部分核销，Y已核销；默认N； */
  allocationStatus: FieldExpression<string>;
  /** 可分配金额 */
  assignableAmount: FieldExpression<number & string>;
  /** 是否含附件 */
  attachmentFlag: FieldExpression<string>;
  /** 审核时间 */
  auditDate: FieldExpression<string>;
  /** 审核人代码 */
  auditPersonCode: FieldExpression<string>;
  /** 审核人名称 */
  auditPersonName: FieldExpression<string>;
  /**  审核状态，Y已审核，N未审核；默认N； */
  auditStatus: FieldExpression<string>;
  /** 本位币币别 */
  baseCurrencyCode: FieldExpression<string>;
  /** 本位币金额 */
  baseCurrencyValue: FieldExpression<number & string>;
  /** 核销主键 */
  bcAllocationEventId: FieldExpression<number>;
  /** 现场结费单主键 */
  bcChargeId: FieldExpression<number>;
  /** 支票ID */
  bcChequeId: FieldExpression<number>;
  /** 发票主键 */
  bcInvoiceId: FieldExpression<number>;
  /** 账单主键 */
  bcLedgerCompId: FieldExpression<number>;
  /** 请款单据ID */
  bcPaymentRequestDocId: FieldExpression<number>;
  /** 请款单主键 */
  bcPaymentRequestId: FieldExpression<number>;
  /** 公共订单主键 */
  bcPublicOrderId: FieldExpression<number>;
  bizReplaceId: FieldExpression<string>;
  /** 业务系统费用ID */
  bizSystemFreightId: FieldExpression<string>;
  /** 子系统委托单的ID */
  bizSystemOrderId: FieldExpression<string>;
  /** 业务系统（数据来源OTW/报关系统） */
  bizSystemType: FieldExpression<string>;
  /** 业务对象代码 */
  businessCode: FieldExpression<string>;
  /** 业务对象名称 */
  businessName: FieldExpression<string>;
  /** 独立结算订单ID */
  businessOrderId: FieldExpression<string>;
  /** 业务类型(仓储出口、仓储进口、运输、报关) */
  businessType: FieldExpression<string>;
  /** 到账日期 */
  chargedDate: FieldExpression<string>;
  /** 计费公式 */
  chargeExpression: FieldExpression<string>;
  /** 支票号 */
  chequeNo: FieldExpression<string>;
  /** 箱ID */
  cntId: FieldExpression<string>;
  /** 箱号  */
  cntNo: FieldExpression<string>;
  /** 箱型尺寸 */
  cntType: FieldExpression<string>;
  /** 账单号 */
  compNo: FieldExpression<string>;
  compNoBatch: FieldExpression<string>;
  /** 对账状态（N：未对账；Y：已对账）默认N */
  compStatus: FieldExpression<string>;
  /** 确认单号 */
  confirmNo: FieldExpression<string>;
  /** 确认单状态 */
  confirmStatus: FieldExpression<string>;
  /** 创建人所属组织 */
  createOffice: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人时区 */
  createTimeZone: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 入库单号 */
  deliveryJobNo: FieldExpression<string>;
  /** 税差金额 */
  diffTaxes: FieldExpression<number & string>;
  /** 税差挂账会计区间 */
  diffTaxesArpFiscalPeriod: FieldExpression<string>;
  /** 税差挂账凭证ID */
  diffTaxesVoucherId: FieldExpression<number>;
  /** 不含税金额 */
  estimatedAmount: FieldExpression<number & string>;
  estimatedInvoiceType: FieldExpression<string>;
  /** 预计开票类型名称 */
  estimatedInvoiceTypeName: FieldExpression<string>;
  /** 预估税金 */
  estimatedTaxes: FieldExpression<number & string>;
  /** 预估税率 */
  estimatedTaxRate: FieldExpression<number & string>;
  /** 结算币到本位币的汇率 */
  exchangeRate: FieldExpression<number & string>;
  /** 结算备注 */
  feeRemark: FieldExpression<string>;
  /** 费用开始日期 */
  freightBeginDate: FieldExpression<string>;
  /** 费用名称代码 */
  freightCode: FieldExpression<string>;
  /** 费用结束日期 */
  freightEndDate: FieldExpression<string>;
  /** 费用名称 */
  freightNameCn: FieldExpression<string>;
  /** 费用来源：H手工输入，A协议价格自动计算，O外部导入，C费用更正，F财务费用，S拆分费用 */
  freightSource: FieldExpression<string>;
  /** --（字段作废）-- */
  freightType: FieldExpression<string>;
  /** 计费业务类型编码 */
  frtBizTypeCode: FieldExpression<string>;
  /** 计费业务类型 */
  frtBizTypeName: FieldExpression<string>;
  /** 挂账会计期间 */
  glArpFiscalPeriod: FieldExpression<string>;
  /** 本位币汇率 */
  glRateBase: FieldExpression<number & string>;
  /** 挂账时间 */
  glVoucherDate: FieldExpression<string>;
  /** 挂账凭证ID */
  glVoucherId: FieldExpression<number>;
  /** 分提单号 */
  hblNo: FieldExpression<string>;
  /** 发票代码 */
  invoiceCode: FieldExpression<string>;
  /** 发票号 */
  invoiceNo: FieldExpression<string>;
  /** 发票流水号（字段作废）  */
  invoiceSerialNo: FieldExpression<string>;
  /** 开票状态；N未开票，Y已开票；默认N； */
  invoiceStatus: FieldExpression<string>;
  /** 到账状态；Y 已到账，N 未到账 */
  isCharged: FieldExpression<string>;
  /**  是否生成挂账凭证。N表示否，Y表示是；默认N； */
  isCommitGlVoucher: FieldExpression<string>;
  /** 能否数据清理, Y:能 N:不能  */
  isDataCleaned: FieldExpression<string>;
  /** 是否存在税差（N：否；Y：是）默认N */
  isDiffTaxes: FieldExpression<string>;
  /** 是否已导出PEC001报文(东方支付) Y:是 N:否 */
  isEdiEpayOut: FieldExpression<string>;
  /** 内配标识  Y是 N不是  默认N */
  isInternalFrt: FieldExpression<string>;
  /** 是否允许开票（N：不开票，Y：开票）默认Y */
  isInvoice: FieldExpression<string>;
  /** 是否不开票 Y:是  N:否 默认N */
  isNotInvoice: FieldExpression<string>;
  /** 撤票
Y 是 N 否  默认为N */
  isReplace: FieldExpression<string>;
  /** 是否现场结费（N：否；Y：是）默认N */
  isSpot: FieldExpression<string>;
  /** 是否含税 （Y：含税，N：不含税） 默认为Y */
  isTax: FieldExpression<string>;
  /** 是否免税 */
  isTaxFree: FieldExpression<string>;
  /** 最后修改人所属组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 最后修改人 */
  lastModifyor: FieldExpression<string>;
  /** 最后修改时间 */
  lastModifyTime: FieldExpression<string>;
  /** 最后修改人时区 */
  lastModifyTimeZone: FieldExpression<string>;
  /** 财务费用类型（应收应付、代收代付） */
  ledgerTypeCode: FieldExpression<string>;
  /** 清单号（收据编号） */
  listNo: FieldExpression<string>;
  /** 提单号 */
  mblNo: FieldExpression<string>;
  /** 航运租金计算期数 */
  noOfPeriod: FieldExpression<number>;
  /** 付款条款 ：PP预付 CC到付 */
  payTerm: FieldExpression<string>;
  /** 云服务分组代码 */
  principalGroupCode: FieldExpression<string>;
  /** 数量 */
  quantity: FieldExpression<number & string>;
  /** 认领状态(/P/Y)默认N */
  receivedStatus: FieldExpression<string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 备注 */
  remark: FieldExpression<string>;
  /** 代收代付互相关联用，收款存对应的付款费用ID，付款存对应的收款费用ID */
  replaceId: FieldExpression<number>;
  /** 代垫类型CODE */
  replaceTypeCode: FieldExpression<string>;
  /** 代垫类型NAME */
  replaceTypeName: FieldExpression<string>;
  /** 批复状态；N未批复，Y已批复；默认N； */
  requestApproveStatus: FieldExpression<string>;
  /** 请款单号 */
  requestNo: FieldExpression<string>;
  /** 请款状态；N未请款，Y已请款；默认N； */
  requestStatus: FieldExpression<string>;
  /** 退押金支票号 */
  returnDepositNo: FieldExpression<string>;
  /** 收付标志；R收，P付 */
  rpFlag: FieldExpression<string>;
  /** 金额 */
  settleAmount: FieldExpression<number & string>;
  /** 币别 */
  settleCurrencyCode: FieldExpression<string>;
  /** 结算对象代码 */
  settleCustCode: FieldExpression<string>;
  /** --（字段作废）-- */
  settleCustDeptCode: FieldExpression<string>;
  /** --（字段作废）-- */
  settleCustDeptName: FieldExpression<string>;
  /** 结算对象简称 */
  settleCustName: FieldExpression<string>;
  /** 结算比例 */
  settlementRatio: FieldExpression<number & string>;
  /** 结算公司 */
  settleOffice: FieldExpression<string>;
  /** 产值部门 */
  settleOfficeDeptCode: FieldExpression<string>;
  /** 产值部门名称 */
  settleOfficeDeptName: FieldExpression<string>;
  /** 结算公司名称 */
  settleOfficeName: FieldExpression<string>;
  /** 箱来源ID */
  sourceCtnId: FieldExpression<string>;
  /** 费用分摊源ID */
  sourceFreightId: FieldExpression<number>;
  /** 原提单+原箱号 */
  sourceOrderCtn: FieldExpression<string>;
  /** 任务单号 */
  subOrderNo: FieldExpression<string>;
  /** 任务代码 */
  taskCode: FieldExpression<string>;
  /** 任务名称（产装，院装） */
  taskName: FieldExpression<string>;
  /** 进项税转出 */
  transferTaxes: FieldExpression<number & string>;
  /** 单位 */
  unit: FieldExpression<string>;
  /** 单价 */
  unitPrice: FieldExpression<number & string>;
  /** 车牌号 */
  vehicleBrand: FieldExpression<string>;
  /** 仓库编码 */
  whCode: FieldExpression<string>;
  /** 仓库名称 */
  whName: FieldExpression<string>;
  /** 冲销原费用ID */
  writeoffId: FieldExpression<number>;
  /** 冲销状态（W 冲销  A 增补 N默认 B 被冲销） */
  writeoffStatus: FieldExpression<string>;
  /** 冲销类型（CM（cross month）跨月红字发票，FC（freight change）费用更正 IS 发票拆分费用） */
  writeoffType: FieldExpression<string>;
  using(client: DaoServiceClient): QBcFreight;
}

declare class QWaybillFee extends ModelExpression<WaybillFee, number> {
  /** 运单编号 */
  waybillId: FieldExpression<number>;
  /** 保价费 */
  insuranceFee: FieldExpression<number>;
  /** 总运费 */
  totalFreight: FieldExpression<number & string>;
  /** 体积 */
  volume: FieldExpression<number & string>;
  /** 重量 */
  weight: FieldExpression<number & string>;
  using(client: DaoServiceClient): QWaybillFee;
}

declare class QSbCodedict extends ModelExpression<SbCodedict, any> {
  bmsId: FieldExpression<string>;
  /** 主键ID */
  codeId: FieldExpression<string>;
  /** 主键ID */
  codeType: FieldExpression<string>;
  /** 代码值 */
  codeValue: FieldExpression<string>;
  /** 编码内容（显示值）[英文] */
  displayValue: FieldExpression<string>;
  /** 编码内容（显示值）[中文] */
  displayValueCn: FieldExpression<string>;
  /** 是否允许修改 */
  modifiable: FieldExpression<number>;
  /** 最后修改时间 */
  modifyLastTime: FieldExpression<string>;
  /** 相关值 */
  relateValue: FieldExpression<string>;
  using(client: DaoServiceClient): QSbCodedict;
}

declare class QDictAreaInfoBak extends ModelExpression<
  DictAreaInfoBak,
  string
> {
  /** 地区编号 */
  areaCode: FieldExpression<string>;
  /** 地区名称(全称) */
  areaFullName: FieldExpression<string>;
  /** 地区名称(简单) */
  areaShortName: FieldExpression<string>;
  using(client: DaoServiceClient): QDictAreaInfoBak;
}

declare class QExportConfig extends ModelExpression<ExportConfig, string> {
  id: FieldExpression<string>;
  async: FieldExpression<boolean>;
  className: FieldExpression<string>;
  columnSetting: FieldExpression<string>;
  dictionaryUrl: FieldExpression<string>;
  fileName: FieldExpression<string>;
  pageSize: FieldExpression<number>;
  printMode: FieldExpression<boolean>;
  sourceUrl: FieldExpression<string>;
  statisticsUrl: FieldExpression<string>;
  template: FieldExpression<any>;
  using(client: DaoServiceClient): QExportConfig;
}

declare class QMdFreightCode extends ModelExpression<MdFreightCode, number> {
  /** 物理主键 */
  mdFreightCodeId: FieldExpression<number>;
  /** Y 有效 N 失效 */
  active: FieldExpression<string>;
  /** 业务类型ID */
  bizSystemId: FieldExpression<string>;
  /** 系统类型：数据字典
   */
  bizSystemType: FieldExpression<string>;
  /** 业务类型 */
  businessType: FieldExpression<string>;
  /** 创建人组织 */
  createOffice: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建时区 */
  createTimeZone: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 默认币别 */
  currency: FieldExpression<string>;
  /** 全局费用名称 */
  feightGlobalName: FieldExpression<string>;
  /** 局部费用编码 */
  freightCode: FieldExpression<string>;
  /** 全局费目代码 */
  freightGlobalCode: FieldExpression<string>;
  /** 局部费用中文名称 */
  freightNameCn: FieldExpression<string>;
  /** 局部费用英文名称 */
  freightNameEn: FieldExpression<string>;
  /** 费用类别 */
  freightType: FieldExpression<string>;
  /** 商品编码 */
  invoiceFreightCode: FieldExpression<string>;
  /** 开票归集名称 */
  invoiceName: FieldExpression<string>;
  /** Y/N */
  isDeleted: FieldExpression<string>;
  /** 最后修改人组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 最后修改人 */
  lastModifyor: FieldExpression<string>;
  /** 最后修改时间 */
  lastModifyTime: FieldExpression<string>;
  /** 最后修改时区 */
  lastModifyTimeZone: FieldExpression<string>;
  /** 费用助记码 */
  memoryCode: FieldExpression<string>;
  principalGroupCode: FieldExpression<string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 备注 */
  remark: FieldExpression<string>;
  /** 报表归集名称 */
  reportName: FieldExpression<string>;
  /** 结算公司代码 */
  settleOffice: FieldExpression<string>;
  /** 结算公司名称 */
  settleOfficeName: FieldExpression<string>;
  /** 费用显示简称 */
  shortName: FieldExpression<string>;
  using(client: DaoServiceClient): QMdFreightCode;
}

declare class QChildren extends ModelExpression<Children, number> {
  /** 孩子编号 */
  id: FieldExpression<number>;
  /** 年龄 */
  age: FieldExpression<number>;
  /** 孩子名称 */
  childName: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 是否逻辑删除 */
  destroyed: FieldExpression<boolean>;
  /** 英文名字 */
  englishName: FieldExpression<string>;
  /** 幼儿园入学日期 */
  enrollmentDate: FieldExpression<string>;
  /** 礼品编号 */
  giftCode: FieldExpression<string>;
  /** 礼物id */
  giftId: FieldExpression<number>;
  /** 幼儿园毕业日期 */
  graduationDate: FieldExpression<string>;
  /** 邮箱 */
  mailbox: FieldExpression<string>;
  /** 手机号，与parents_mobile保持一致 */
  mobile: FieldExpression<string>;
  /** 修改人 */
  modifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 父母的手机联系方式，与mobile保持一致 */
  parentsMobile: FieldExpression<string>;
  /** 固定电话 */
  phone: FieldExpression<string>;
  /** 学龄 */
  schoolAge: FieldExpression<number>;
  /** 孩子性别 */
  sex: FieldExpression<boolean>;
  /** 用户属性字段 */
  userAttribute: FieldExpression<string>;
  /** 乐观锁版本号 */
  version: FieldExpression<number>;
  using(client: DaoServiceClient): QChildren;
}

declare class QI18nMessages extends ModelExpression<I18nMessages, number> {
  id: FieldExpression<number>;
  key: FieldExpression<string>;
  localeId: FieldExpression<number>;
  message: FieldExpression<string>;
  using(client: DaoServiceClient): QI18nMessages;
}

declare class QCourse extends ModelExpression<Course, number> {
  /** ID */
  id: FieldExpression<number>;
  /** 课程内容 */
  courseContent: FieldExpression<string>;
  /** 课程名称 */
  courseName: FieldExpression<string>;
  /** 课程节数 */
  courseNum: FieldExpression<number>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 是否逻辑删除 */
  destroyed: FieldExpression<boolean>;
  /** 修改人 */
  modifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 用户属性字段 */
  userAttribute: FieldExpression<string>;
  /** 乐观锁版本号 */
  version: FieldExpression<number>;

  student: QStudent;
  using(client: DaoServiceClient): QCourse;
}

declare class QUserAddTest extends ModelExpression<UserAddTest, number> {
  id: FieldExpression<number>;
  password: FieldExpression<string>;
  username: FieldExpression<string>;
  using(client: DaoServiceClient): QUserAddTest;
}

declare class QUserUpdateTest extends ModelExpression<UserUpdateTest, number> {
  id: FieldExpression<number>;
  password: FieldExpression<string>;
  username: FieldExpression<string>;
  using(client: DaoServiceClient): QUserUpdateTest;
}

declare class QTimerVersion extends ModelExpression<TimerVersion, number> {
  /** 定时器id */
  timerId: FieldExpression<number>;
  /** 当前实例标识 */
  identifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 定时器版本， 当前时间／定时间隔 */
  version: FieldExpression<number>;
  using(client: DaoServiceClient): QTimerVersion;
}

declare class QSupportedLocale extends ModelExpression<
  SupportedLocale,
  number
> {
  id: FieldExpression<number>;
  /** 地区/国家 */
  country: FieldExpression<string>;
  display: FieldExpression<string>;
  /** 语言 */
  language: FieldExpression<string>;
  state: FieldExpression<string>;
  /** 变量 */
  variant: FieldExpression<string>;
  using(client: DaoServiceClient): QSupportedLocale;
}

declare class QBcPublicOrder extends ModelExpression<BcPublicOrder, number> {
  /** 物理主键 */
  bcPublicOrderId: FieldExpression<number>;
  /** 财务锁时间 */
  acLockDate: FieldExpression<string>;
  /** 财务锁操作人代码 */
  acLockPersonCode: FieldExpression<string>;
  /** 财务锁操作人 */
  acLockPersonName: FieldExpression<string>;
  /** 财务锁状态YN */
  acLockStatus: FieldExpression<string>;
  /**  审核时间 */
  auditDate: FieldExpression<string>;
  /**  审核人代码 */
  auditPersonCode: FieldExpression<string>;
  /**  审核人名称 */
  auditPersonName: FieldExpression<string>;
  /**  审核状态，Y已审核，N未审核；默认N； */
  auditStatus: FieldExpression<string>;
  /** 靠泊时间 */
  berthingTime: FieldExpression<string>;
  /** 货主 */
  bppCode: FieldExpression<string>;
  /** 货主名称 */
  bppName: FieldExpression<string>;
  /** 中集统一订单ID */
  cimcId: FieldExpression<string>;
  /** 中集统一订单号 */
  cimcNo: FieldExpression<string>;
  /** 创建人所属组织 */
  createOffice: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人时区 */
  createTimeZone: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 卸船作业区 */
  discArea: FieldExpression<string>;
  /** 结算备注 */
  feeRemark: FieldExpression<string>;
  /** 航班号 */
  flightNo: FieldExpression<string>;
  /** 业务流向：I：进口；O：出口；N：国内（国内指内贸）
BMS要求
通过业务类型判断 */
  flowDirection: FieldExpression<string>;
  /** 总利息 （收-付） */
  grossInterest: FieldExpression<number & string>;
  /** 是否独立结算订单（N：否（普通订单）；Y：是） */
  isIndependent: FieldExpression<string>;
  /** 内配标识  Y是 N不是  默认N */
  isInternalFrt: FieldExpression<string>;
  /** 是否NVOCC  BMS要求
通过订单是否出HBL判断
Y：是  N ：否  默认为N */
  isNvocc: FieldExpression<string>;
  /** 最后修改人所属组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 最后修改人 */
  lastModifyor: FieldExpression<string>;
  /** 最后修改时间 */
  lastModifyTime: FieldExpression<string>;
  /** 最后修改人时区 */
  lastModifyTimeZone: FieldExpression<string>;
  /** 装船作业区 */
  loadArea: FieldExpression<string>;
  mfLine: FieldExpression<string>;
  /** 海运航线代码 */
  mfLineCode: FieldExpression<string>;
  parentOrderId: FieldExpression<string>;
  parentOrderNo: FieldExpression<string>;
  parentSubOrderId: FieldExpression<string>;
  parentSubOrderNo: FieldExpression<string>;
  /** 付款利息(负数显示) */
  paymentInterest: FieldExpression<number & string>;
  /** 运费条款 */
  payTerm: FieldExpression<string>;
  /** 运费条款 */
  payTypeCode: FieldExpression<string>;
  /** 云服务分组代码 */
  principalGroupCode: FieldExpression<string>;
  /** 上报时间 */
  publicApprovalDate: FieldExpression<string>;
  /** 上报会计区间 */
  publicApprovalFiscalPeriod: FieldExpression<string>;
  /** 上报人 */
  publicApprovalPersonCode: FieldExpression<string>;
  /** 上报人 */
  publicApprovalPersonName: FieldExpression<string>;
  /**  报批备注 */
  publicApprovalRemark: FieldExpression<string>;
  /** 实际到港日 */
  publicAta: FieldExpression<string>;
  /** 实际开航日 */
  publicAtd: FieldExpression<string>;
  /** 业务系统 */
  publicBizSystemType: FieldExpression<string>;
  /** 订舱代理代码  BMS要求 */
  publicBookingAgencyCode: FieldExpression<string>;
  /** 订舱代理名称 */
  publicBookingAgencyName: FieldExpression<string>;
  /** 订舱协议号  BMS要求 */
  publicBookingProtocolNo: FieldExpression<string>;
  /** 业务开始日期（字段作废） */
  publicBusinessBegDate: FieldExpression<string>;
  /** 公共  业务起始日期 */
  publicBusinessDate: FieldExpression<string>;
  /** 业务结束日期（字段作废） */
  publicBusinessEndDate: FieldExpression<string>;
  /** 公共  业务完成日期 BMS要求的公货物交付时间   */
  publicBusinessFinishDate: FieldExpression<string>;
  /** 业务单ID 例如存入的 MF_ORDER_ID */
  publicBusinessOrderId: FieldExpression<string>;
  /** 业务类型  BMS要求 */
  publicBusinessType: FieldExpression<string>;
  /** 业务类型名称 */
  publicBusinessTypeName: FieldExpression<string>;
  /** 揽货部门 */
  publicCanvassionDepartment: FieldExpression<string>;
  /** 揽货部门CODE */
  publicCanvassionDeptCode: FieldExpression<string>;
  /** 公共  揽货方式 BMS要求 */
  publicCanvassionMode: FieldExpression<string>;
  /** 公共  货物名称(中文) */
  publicCargoDescriptionCn: FieldExpression<string>;
  /** 公共  货物名称(英文) */
  publicCargoDescriptionEn: FieldExpression<string>;
  /** 公共  承运公司ID（海运：船公司；空运：航空公司）
支线船公司、干线船公司   BMS要求 */
  publicCarrierCode: FieldExpression<string>;
  /** 公共  承运公司 */
  publicCarrierName: FieldExpression<string>;
  /** 计费重 */
  publicChargingWeight: FieldExpression<number & string>;
  /** 计费重单位 */
  publicChargingWeightUnit: FieldExpression<string>;
  /** 公共  收货人ID */
  publicConsigneeCode: FieldExpression<string>;
  /** 公共  收货人 */
  publicConsigneeName: FieldExpression<string>;
  /** 委托人代码 */
  publicConsignorCode: FieldExpression<string>;
  /** 公共  委托人 */
  publicConsignorName: FieldExpression<string>;
  /** 委托联系人 */
  publicContactName: FieldExpression<string>;
  /** 订舱部门代码 */
  publicCooperatorOfficeCode: FieldExpression<string>;
  /** 订舱部门 */
  publicCooperatorOfficeName: FieldExpression<string>;
  /** 公共  客服代码 */
  publicCsCode: FieldExpression<string>;
  /** 公共  客服 */
  publicCsName: FieldExpression<string>;
  /** 根据柜号拼接起来，用分号;分割 */
  publicCtnNo: FieldExpression<string>;
  /** 箱型箱量汇总格式样例：1X20GP+2X40HQ */
  publicCtnNum: FieldExpression<string>;
  /** 订单下集装箱表中重箱TEU量汇总 */
  publicCtnTeu: FieldExpression<string>;
  /** 公共  货物体积 */
  publicCube: FieldExpression<number & string>;
  /** 公共  体积单位 */
  publicCubeUnit: FieldExpression<string>;
  /** 公共  客户业务编号 */
  publicCustBusinessNo: FieldExpression<string>;
  /** 海关编号 */
  publicCustomNo: FieldExpression<string>;
  /** 公共  海外代理代码   BMS要求 */
  publicDestAgentCode: FieldExpression<string>;
  /** 公共  海外代理名称 */
  publicDestAgentName: FieldExpression<string>;
  /** 预计对账日 */
  publicEstimatedCompDate: FieldExpression<string>;
  /** 预计开票日 */
  publicEstimatedIssueDate: FieldExpression<string>;
  /** 公共到港日 */
  publicEta: FieldExpression<string>;
  /** 公共  开航日期/航期  BMS要求 */
  publicEtd: FieldExpression<string>;
  /** 外托货代代码 */
  publicFwPartnerCode: FieldExpression<string>;
  /** 外托货代 */
  publicFwPartnerName: FieldExpression<string>;
  /** 总订单ID */
  publicGoOrderId: FieldExpression<number>;
  /** 公共  货物毛重 */
  publicGrossWeight: FieldExpression<number & string>;
  /** 公共  重量单位 */
  publicGrossWeightUnit: FieldExpression<string>;
  /** 公共  货代提单号 */
  publicHblNo: FieldExpression<string>;
  /** 是否报批 Y:是 N：否  默认为N */
  publicIsApproval: FieldExpression<string>;
  /** 公共 是否报关 */
  publicIsCustomsClearance: FieldExpression<string>;
  /** 公共  是否HBL */
  publicIsHbl: FieldExpression<string>;
  /** 公共 是否报检 */
  publicIsInspection: FieldExpression<string>;
  /** 公共 是否保险 */
  publicIsInsurance: FieldExpression<string>;
  /** PUBLIC_IS_TRUCK */
  publicIsTruck: FieldExpression<string>;
  /** 公共 是否仓储 */
  publicIsWarehouse: FieldExpression<string>;
  /** 公共  外运业务号 BMS 要求 */
  publicJobNo: FieldExpression<string>;
  /** 公共  提单号 BMS要求 */
  publicMblNo: FieldExpression<string>;
  /** 公共  包装件数 */
  publicNoOfPackage: FieldExpression<number>;
  /** 通知人代码 */
  publicNotifyCode: FieldExpression<string>;
  /** 公共  通知人 */
  publicNotifyName: FieldExpression<string>;
  /** 公共  操作代码 */
  publicOpCode: FieldExpression<string>;
  /** 操作类型(业务子类) */
  publicOperateType: FieldExpression<string>;
  /** 操作类型名称(业务子类) */
  publicOperateTypeName: FieldExpression<string>;
  /** 公共  操作 */
  publicOpName: FieldExpression<string>;
  /** 订单备注 */
  publicOrderRemark: FieldExpression<string>;
  /** 公共组织机构代码 */
  publicOrgId: FieldExpression<string>;
  /** 代理部门代码 */
  publicOverseaOfficeCode: FieldExpression<string>;
  /** 代理部门 */
  publicOverseaOfficeName: FieldExpression<string>;
  /** 公共  包装类型 */
  publicPackageType: FieldExpression<string>;
  /** 公共  包装类型名称 */
  publicPackageTypeName: FieldExpression<string>;
  /** 付款方式   BMS要求 */
  publicPaymentMode: FieldExpression<string>;
  /** 公共  卸货港 */
  publicPod: FieldExpression<string>;
  /** 公共  卸货港代码 */
  publicPodCode: FieldExpression<string>;
  /** 公共  装货港 */
  publicPol: FieldExpression<string>;
  /** 公共  装货港代码 */
  publicPolCode: FieldExpression<string>;
  /** 公共  目的地代码 */
  publicPortOfDestCode: FieldExpression<string>;
  /** 公共  目的地 */
  publicPortOfDestination: FieldExpression<string>;
  /** 项目ID */
  publicProjectId: FieldExpression<number>;
  /** 公共  业务员代码 */
  publicSalesCode: FieldExpression<string>;
  /** 业务员名称 */
  publicSalesName: FieldExpression<string>;
  /** 结算公司 */
  publicSettleOffice: FieldExpression<string>;
  /** 结算公司名称 */
  publicSettleOfficeName: FieldExpression<string>;
  /** 公共  发货人ID */
  publicShipperCode: FieldExpression<string>;
  /** 公共  发货人 */
  publicShipperName: FieldExpression<string>;
  /** 业务类型（数据字典） */
  publicSourceType: FieldExpression<string>;
  /** 业务子类 */
  publicSubBusinessType: FieldExpression<string>;
  /** 公共 运输条款  BMS要求 */
  publicTransportTerm: FieldExpression<string>;
  /** 公共  船名代码 */
  publicVesselCode: FieldExpression<string>;
  /** 公共  船舶名称(英文) */
  publicVesselName: FieldExpression<string>;
  /** 公共  船舶名称(中文) */
  publicVesselNameCn: FieldExpression<string>;
  /** 公共  航次/航班 */
  publicVoyage: FieldExpression<string>;
  /** 收款利息 */
  receiveInterest: FieldExpression<number & string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 小单号 */
  smallSingleNo: FieldExpression<string>;
  /** 凭证锁时间 */
  voucherLockDate: FieldExpression<string>;
  /** 凭证锁操作人代码 */
  voucherLockPersonCode: FieldExpression<string>;
  /** 凭证锁操作人 */
  voucherLockPersonName: FieldExpression<string>;
  /** 凭证锁状态YN */
  voucherLockStatus: FieldExpression<string>;
  using(client: DaoServiceClient): QBcPublicOrder;
}

declare class QTeacher extends ModelExpression<Teacher, number> {
  /** ID */
  id: FieldExpression<number>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 是否逻辑删除 */
  destroyed: FieldExpression<boolean>;
  /** 修改人 */
  modifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 学生id */
  studentId: FieldExpression<number>;
  /** 教师年龄 */
  teacherAge: FieldExpression<number>;
  /** 教师名称 */
  teacherName: FieldExpression<string>;
  /** 用户属性字段 */
  userAttribute: FieldExpression<string>;
  /** 乐观锁版本号 */
  version: FieldExpression<number>;
  sex: FieldExpression<string>;
  using(client: DaoServiceClient): QTeacher;
}

declare class QStudent extends ModelExpression<Student, number> {
  /** 学生id */
  id: FieldExpression<number>;
  /** 籍贯 */
  address: FieldExpression<string>;
  /** 学生年龄 */
  age: FieldExpression<number>;
  /** 出生日期 */
  birthday: FieldExpression<string>;
  /** 确认密码 */
  confirmPassword: FieldExpression<string>;
  /** 课程ID */
  courseId: FieldExpression<number>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 逻辑删除 */
  destroyed: FieldExpression<boolean>;
  /** 邮箱 */
  email: FieldExpression<string>;
  /** 入学日期 */
  enrollment: FieldExpression<string>;
  /** 移动电话 */
  mobile: FieldExpression<string>;
  /** 修改人 */
  modifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 学费 */
  money: FieldExpression<number & string>;
  /** 学生姓名 */
  name: FieldExpression<string>;
  /** 密码 */
  password: FieldExpression<string>;
  /** 分数 */
  score: FieldExpression<number>;
  /** 学生性别 */
  sex: FieldExpression<boolean>;
  /** 老师ID */
  teacherId: FieldExpression<number>;
  /** 用户属性字段 */
  userAttribute: FieldExpression<string>;
  /** 乐观锁 */
  version: FieldExpression<number>;

  fileKey: FieldExpression<string>;

  teachers: QTeacher;
  using(client: DaoServiceClient): QStudent;
}

declare class QRpPublicOrder extends ModelExpression<RpPublicOrder, any> {
  /** 空运  海外代理 */
  azAgentName: FieldExpression<string>;
  /** 空运  航空公司 */
  azCarrierName: FieldExpression<string>;
  /** 空运  收货人 */
  azConsigneeName: FieldExpression<string>;
  /** 空运  抵达航期 */
  azEta: FieldExpression<string>;
  /** 空运  实际航期 */
  azEtd: FieldExpression<string>;
  /** 空运  航班号 */
  azFlightNo: FieldExpression<string>;
  /** 空运  进出口 */
  azIoInd: FieldExpression<string>;
  /** 空运  通知人 */
  azNotifyName: FieldExpression<string>;
  /** 空运  操作 */
  azOperatorName: FieldExpression<string>;
  /** 空运  分单号 */
  azOrderHbl: FieldExpression<string>;
  /** 空运  揽货部门 */
  azSalesOfficeName: FieldExpression<string>;
  /** 空运  客服 */
  azServiceName: FieldExpression<string>;
  /** 空运  发货人 */
  azShipperName: FieldExpression<string>;
  /** 空运  揽货方式 */
  azSoourceMode: FieldExpression<string>;
  /** 空运  订舱单位 */
  azSupplierName: FieldExpression<string>;
  /** 箱管  箱号 */
  cnCntNo: FieldExpression<string>;
  /** 箱管  箱经营人 */
  cnCntOperator: FieldExpression<string>;
  /** 箱管  铅封号 */
  cnCntSealNo: FieldExpression<string>;
  /** 箱管  尺寸 */
  cnCntSizetype: FieldExpression<string>;
  /** 箱管  箱状态 */
  cnCntStatus: FieldExpression<string>;
  /** 箱管  用箱人 */
  cnCntUserCode: FieldExpression<string>;
  /** 箱管  危险品标识 */
  cnDangerFlag: FieldExpression<string>;
  /** 箱管  提箱点 */
  cnDeliveryPlace: FieldExpression<string>;
  /** 箱管  卸货作业区 */
  cnDischargeArea: FieldExpression<string>;
  /** 箱管  运箱人 */
  cnHaulierCode: FieldExpression<string>;
  /** 箱管  进出口标志 */
  cnIeFlag: FieldExpression<string>;
  /** 箱管  作业类型 */
  cnJobType: FieldExpression<string>;
  /** 箱管  装货作业区 */
  cnLoadAreaCode: FieldExpression<string>;
  /** 箱管  还箱点 */
  cnReturnPlace: FieldExpression<string>;
  /** 箱管  SOC标识 */
  cnSocFlag: FieldExpression<string>;
  /** 船务调度  靠泊时间 */
  huBerthingTime: FieldExpression<string>;
  /** 船务调度  预抵日期 */
  huEtaTime: FieldExpression<string>;
  /** 船务调度  预离日期 */
  huEtdTime: FieldExpression<string>;
  /** 船务调度  出口航次 */
  huExpVoyageCode: FieldExpression<string>;
  /** 船务调度  进口航次 */
  huImpVoyageCode: FieldExpression<string>;
  /** 船务调度  开航时间 */
  huSailingTime: FieldExpression<string>;
  /** 船务调度  中文船名 */
  huShipCnName: FieldExpression<string>;
  /** 结算公司 */
  inputCompanyId: FieldExpression<string>;
  /** 公共 创建时间 */
  inputDate: FieldExpression<string>;
  /** 业务归属部门ID */
  inputOfficeId: FieldExpression<string>;
  /** 公共 创建人 */
  inputPerson: FieldExpression<string>;
  /** 是否免税：1-免税；0-带税 */
  isNotax: FieldExpression<string>;
  /** 最后修改时间 */
  modifyLastTime: FieldExpression<string>;
  /** 海运  海外代理 */
  ooAgentName: FieldExpression<string>;
  /** 海运  收货人 */
  ooConsigneeName: FieldExpression<string>;
  /** 海运  客户委托号 */
  ooCustOrderId: FieldExpression<string>;
  /** 海运  到港日 */
  ooEta: FieldExpression<string>;
  /** 海运  开航日 */
  ooEtd: FieldExpression<string>;
  /** 海运  外托货代id */
  ooFwPartnerId: FieldExpression<string>;
  /** 海运  外托货代name */
  ooFwPartnerName: FieldExpression<string>;
  /** 海运  货代提单号 */
  ooHblNo: FieldExpression<string>;
  /** 海运  航线 */
  ooLinedefId: FieldExpression<string>;
  /** 海运  操作 */
  ooOperatorName: FieldExpression<string>;
  /** 海运  船公司 */
  ooPrecarrierName: FieldExpression<string>;
  /** 海运  揽货部门 */
  ooSalesOfficeName: FieldExpression<string>;
  /** 海运  客服 */
  ooServiceName: FieldExpression<string>;
  /** 海运  订舱代理 */
  ooShipAgentName: FieldExpression<string>;
  /** 海运  发货人 */
  ooShipperName: FieldExpression<string>;
  /** 海运  揽货方式 */
  ooSourceMode: FieldExpression<string>;
  /** 海运  揽货方式 */
  ooSourceModeName: FieldExpression<string>;
  /** 公共  工作编号 */
  publicBkNo: FieldExpression<string>;
  /** 公共  提单号 */
  publicBlNo: FieldExpression<string>;
  /** 公共  业务日期 */
  publicBusinessDate: FieldExpression<string>;
  /** 公共  完成标志 */
  publicCompletedSign: FieldExpression<number>;
  /** 公共  委托人全称 */
  publicConsignorFullname: FieldExpression<string>;
  /** 公共  委托人 */
  publicConsignorName: FieldExpression<string>;
  /** 公共  委托人联系人 */
  publicContactName: FieldExpression<string>;
  /** 公共  订舱部门id */
  publicCooperatorOfficeId: FieldExpression<string>;
  /** 公共  订舱部门name */
  publicCooperatorOfficeName: FieldExpression<string>;
  /** 公共  海关编号 */
  publicCustomNo: FieldExpression<string>;
  /** 公共  目的地 */
  publicDestinalPlace: FieldExpression<string>;
  /** 公共 统一订单编号 */
  publicJobNo: FieldExpression<string>;
  /** 主键ID */
  publicOrderId: FieldExpression<string>;
  /** 公共  代理部门id */
  publicOverseaOfficeId: FieldExpression<string>;
  /** 公共  代理部门name */
  publicOverseaOfficeName: FieldExpression<string>;
  /** 公共  卸货港 */
  publicPodName: FieldExpression<string>;
  /** 公共  装货港 */
  publicPolName: FieldExpression<string>;
  /** 公共  业务员ID */
  publicSalesId: FieldExpression<string>;
  /** 公共  业务员 */
  publicSalesName: FieldExpression<string>;
  /** 公共  揽货代理id */
  publicSourceAgentId: FieldExpression<string>;
  /** 公共  揽货代理name */
  publicSourceAgentName: FieldExpression<string>;
  /** 公共  船舶名称(英文) */
  publicVesselName: FieldExpression<string>;
  /** 公共  船舶名称(中文) */
  publicVesselNameCn: FieldExpression<string>;
  /** 公共  航次/航班 */
  publicVoyage: FieldExpression<string>;
  /** 业务单ID */
  refBusinessId: FieldExpression<string>;
  /** 业务类型 */
  refBusinessType: FieldExpression<string>;
  /** 系统类型 */
  refSystemType: FieldExpression<string>;
  /** 出口单证  托运人 */
  seBookingParty: FieldExpression<string>;
  /** 出口单证  舱位公司 */
  seCarrierName: FieldExpression<string>;
  /** 出口单证  收货人 */
  seConsignee: FieldExpression<string>;
  /** 出口单证  预离时间 */
  seEtdTime: FieldExpression<string>;
  /** 出口单证  装货作业区 */
  seLoadAreaCode: FieldExpression<string>;
  /** 出口单证  运输方式（卸） */
  seMovementDisch: FieldExpression<string>;
  /** 出口单证  运输方式（装） */
  seMovementLoading: FieldExpression<string>;
  /** 出口单证  运费条款 */
  sePayTypeCode: FieldExpression<string>;
  /** 出口单证  开航时间 */
  seSailingTime: FieldExpression<string>;
  /** 出口单证  二程船名 */
  seSndEnVessel: FieldExpression<string>;
  /** 出口单证  二程航次 */
  seSndVoyageCode: FieldExpression<string>;
  /** 进口单证  靠泊时间 */
  siBerthingTime: FieldExpression<string>;
  /** 进口单证  舱位公司 */
  siCarrierId: FieldExpression<string>;
  /** 进口单证  舱位公司 */
  siCarrierName: FieldExpression<string>;
  /** 进口单证  收货人 */
  siConsignee: FieldExpression<string>;
  /** 进口单证  卸船作业区 */
  siDiscAreaCode: FieldExpression<string>;
  /** 进口单证  预抵时间 */
  siEtaTime: FieldExpression<string>;
  /** 进口单证  进口航次 */
  siImpVoyageCode: FieldExpression<string>;
  /** 进口单证  装船作业区 */
  siLoadAreaCode: FieldExpression<string>;
  /** 进口单证  运输条款（卸） */
  siMovementDischar: FieldExpression<string>;
  /** 进口单证  运输条款（装） */
  siMovementLoading: FieldExpression<string>;
  /** 进口单证  付费方式 */
  siPayTypeCode: FieldExpression<string>;
  /** 进口单证  前程提单号 */
  siPreBlNo: FieldExpression<string>;
  /** 进口单证  前程船名 */
  siPreShipEnName: FieldExpression<string>;
  /** 进口单证  前程航次 */
  siPreVoyageNo: FieldExpression<string>;
  using(client: DaoServiceClient): QRpPublicOrder;
}

declare class QShop extends ModelExpression<Shop, number> {
  /** 礼物店id */
  shopId: FieldExpression<number>;
  /** 礼物店名 */
  giftShop: FieldExpression<string>;
  /** 乐观锁版本号 */
  version: FieldExpression<number>;
  gifts: QGift;
  using(client: DaoServiceClient): QShop;
}

declare class QGift extends ModelExpression<Gift, number> {
  /** 礼品id */
  id: FieldExpression<number>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 是否逻辑删除 */
  destroyed: FieldExpression<boolean>;
  /** 礼品编号 */
  giftCode: FieldExpression<string>;
  /** 礼品名称 */
  giftName: FieldExpression<string>;
  /** 修改人 */
  modifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  /** 出厂年份 */
  productionYear: FieldExpression<number>;
  /** 礼物店id */
  shopId: FieldExpression<number>;
  /** 用户属性字段 */
  userAttribute: FieldExpression<string>;
  /** 乐观锁版本号 */
  version: FieldExpression<number>;
  children: QChildren;
  using(client: DaoServiceClient): QGift;
}

declare class QUserSelectTest extends ModelExpression<UserSelectTest, number> {
  id: FieldExpression<number>;
  password: FieldExpression<string>;
  username: FieldExpression<string>;
  using(client: DaoServiceClient): QUserSelectTest;
}

declare class QEmployee extends ModelExpression<Employee, number> {
  /** 员工主键 */
  employeeId: FieldExpression<number>;
  /** 地址 */
  address: FieldExpression<string>;
  /** 年龄 */
  age: FieldExpression<number>;
  /** 生日 */
  birthDay: FieldExpression<string>;
  /** 员工中文名称 */
  cname: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人编号 */
  creator: FieldExpression<string>;
  /** 从属部门编号 */
  deptId: FieldExpression<number>;
  /** 删除标记 */
  destroyed: FieldExpression<boolean>;
  /** 邮箱 */
  email: FieldExpression<string>;
  /** 手机号码 */
  mobile: FieldExpression<string>;
  /** 修改人编号 */
  modifier: FieldExpression<string>;
  /** 创建时间 */
  modifyTime: FieldExpression<string>;
  /** 密码 */
  password: FieldExpression<string>;
  /** 组织编号 */
  principalGroupCode: FieldExpression<string>;
  /** 性别 */
  sex: FieldExpression<boolean>;
  /** 员工用户名 */
  username: FieldExpression<string>;
  /** 乐观锁版本 */
  version: FieldExpression<number>;
  dept: QDept;
  using(client: DaoServiceClient): QEmployee;
}

declare class QMdCodeDict extends ModelExpression<MdCodeDict, number> {
  /** 物理主键 */
  mdCodeDictId: FieldExpression<number>;
  /** 有效 */
  active: FieldExpression<string>;
  /** 字典类型代码 */
  codeType: FieldExpression<string>;
  /** 编码 */
  codeValue: FieldExpression<string>;
  /** 创建人所属组织 */
  createOffice: FieldExpression<string>;
  /** 录入时间 */
  createTime: FieldExpression<string>;
  /** 创建人时区 */
  createTimeZone: FieldExpression<string>;
  /** 录入人 */
  creator: FieldExpression<string>;
  /** 英文显示值 */
  displayValue: FieldExpression<string>;
  /** 中文显示值 */
  displayValueCn: FieldExpression<string>;
  /** 最后修改人所属组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 修改人 */
  lastModifyor: FieldExpression<string>;
  /** 修改时间 */
  lastModifyTime: FieldExpression<string>;
  /** 最后修改人时区 */
  lastModifyTimeZone: FieldExpression<string>;
  /** 物理主键 */
  mdCodeTypeId: FieldExpression<number>;
  /** 云服务分组代码 */
  principalGroupCode: FieldExpression<string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 自定义码 */
  relateValue: FieldExpression<string>;
  /** 备注 */
  remark: FieldExpression<string>;
  /** 序号 */
  serialNumber: FieldExpression<number>;
  /** 结算公司代码 */
  settleOffice: FieldExpression<string>;
  /** 结算公司 */
  settleOfficeName: FieldExpression<string>;
  tmpPId: FieldExpression<number>;
  tmpSeqId: FieldExpression<number>;
  using(client: DaoServiceClient): QMdCodeDict;
}

declare class QGlVoucher extends ModelExpression<GlVoucher, number> {
  /** 主键ID */
  glVoucherId: FieldExpression<number>;
  /** 附件数量 */
  attachment: FieldExpression<number & string>;
  coaName: FieldExpression<string>;
  /** 公司 */
  companyCode: FieldExpression<string>;
  /** 公司名称 */
  companyName: FieldExpression<string>;
  /** 创建人所属组织 */
  createOffice: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建人时区 */
  createTimeZone: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 部门代码 */
  departmentCode: FieldExpression<string>;
  /**  SAP凭证号 */
  externalVoucherNo: FieldExpression<string>;
  /** 会计期间 */
  fiscalPeriod: FieldExpression<string>;
  /** 是否税差凭证(N:否;Y:是)默认N */
  isDiffTaxes: FieldExpression<string>;
  /** 最后修改人所属组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 最后修改人 */
  lastModifyor: FieldExpression<string>;
  /** 最后修改时间 */
  lastModifyTime: FieldExpression<string>;
  /** 最后修改人时区 */
  lastModifyTimeZone: FieldExpression<string>;
  /** 云服务分组代码 */
  principalGroupCode: FieldExpression<string>;
  /** 利润中心 */
  profitCenter: FieldExpression<string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 凭证参考号码 */
  referenceCode: FieldExpression<string>;
  /** 序列号 */
  seqNo: FieldExpression<string>;
  /** 业务系统的相关业务单证号码  */
  transactionNo: FieldExpression<string>;
  /** 传输来源 */
  transactionSource: FieldExpression<string>;
  /** 凭证审核用户 */
  validateUser: FieldExpression<string>;
  /** 凭证审核用户 */
  validateUserName: FieldExpression<string>;
  /** 凭证类别 */
  voucherCategory: FieldExpression<string>;
  /** 凭证日期  */
  voucherDate: FieldExpression<string>;
  /** 凭证转出人 */
  voucherExportPerson: FieldExpression<string>;
  /** 凭证转出人 */
  voucherExportPersonName: FieldExpression<string>;
  /** 凭证导出状态 */
  voucherExportState: FieldExpression<string>;
  /** 凭证导出时间 */
  voucherExportTime: FieldExpression<string>;
  /** 凭证号码 */
  voucherNo: FieldExpression<string>;
  /** 凭证备注信息 */
  voucherRemarks: FieldExpression<string>;
  /** 凭证状态 */
  voucherState: FieldExpression<string>;
  /** 在凭证类别下的具体凭证类型 */
  voucherType: FieldExpression<string>;
  using(client: DaoServiceClient): QGlVoucher;
}

declare class QImportConfig extends ModelExpression<ImportConfig, string> {
  id: FieldExpression<string>;
  allowParameter: FieldExpression<boolean>;
  async: FieldExpression<boolean>;
  childrenTable: FieldExpression<string>;
  className: FieldExpression<string>;
  dealService: FieldExpression<string>;
  defineColumn: FieldExpression<string>;
  dictionaryUrl: FieldExpression<string>;
  methodName: FieldExpression<string>;
  primaryColumns: FieldExpression<string>;
  template: FieldExpression<any>;
  validateHead: FieldExpression<boolean>;
  validateMethod: FieldExpression<string>;
  using(client: DaoServiceClient): QImportConfig;
}

declare class QAppNodes extends ModelExpression<AppNodes, number> {
  id: FieldExpression<number>;
  appName: FieldExpression<string>;
  nodeName: FieldExpression<string>;
  nodeNum: FieldExpression<number>;
  using(client: DaoServiceClient): QAppNodes;
}

declare class QDictProductType extends ModelExpression<
  DictProductType,
  string
> {
  productCode: FieldExpression<string>;
  productName: FieldExpression<string>;
  using(client: DaoServiceClient): QDictProductType;
}

declare class QMdGlobalBusiness extends ModelExpression<
  MdGlobalBusiness,
  number
> {
  /** 业务产品定义 */
  mdSubBusinessGlobalId: FieldExpression<number>;
  /** 有效标志（Y/N） */
  active: FieldExpression<string>;
  /** 创建人组织 */
  createOffice: FieldExpression<string>;
  /** 创建时间 */
  createTime: FieldExpression<string>;
  /** 创建时区 */
  createTimeZone: FieldExpression<string>;
  /** 创建人 */
  creator: FieldExpression<string>;
  /** 删除标记 Y/N */
  isDeleted: FieldExpression<string>;
  /** 是否免税 */
  isTaxFree: FieldExpression<string>;
  /** 最后修改人组织 */
  lastModifyOffice: FieldExpression<string>;
  /** 最后修改人 */
  lastModifyor: FieldExpression<string>;
  /** 最后修改时间 */
  lastModifyTime: FieldExpression<string>;
  /** 最后修改市区 */
  lastModifyTimeZone: FieldExpression<string>;
  principalGroupCode: FieldExpression<string>;
  /** 版本号 */
  recordVersion: FieldExpression<number>;
  /** 备注 */
  remark: FieldExpression<string>;
  /** 全局业务产品代码 */
  subBusinessGlobalCode: FieldExpression<string>;
  /** 全局业务产品名称 */
  subBusinessGlobalName: FieldExpression<string>;
  using(client: DaoServiceClient): QMdGlobalBusiness;
}

declare class QChangeLog extends ModelExpression<ChangeLog, number> {
  /** ID */
  id: FieldExpression<number>;
  /** JSON */
  changeData: FieldExpression<string>;
  /** 数据库id */
  dataSourceId: FieldExpression<number>;
  /** model name */
  modelName: FieldExpression<string>;
  /** 操作时间 */
  operateTime: FieldExpression<string>;
  /** 操作人 */
  operator: FieldExpression<string>;
  /** sql */
  sqlStmt: FieldExpression<string>;
  using(client: DaoServiceClient): QChangeLog;
}

declare class QDictAreaInfo extends ModelExpression<DictAreaInfo, string> {
  areaCode: FieldExpression<string>;
  areaFullName: FieldExpression<string>;
  areaShortName: FieldExpression<string>;
  using(client: DaoServiceClient): QDictAreaInfo;
}

declare class QGtxTrans extends ModelExpression<GtxTrans, number> {
  /** 主键 */
  gtxTransId: FieldExpression<number>;
  /** 当前实例标识 */
  identifier: FieldExpression<string>;
  /** 修改时间 */
  modifyTime: FieldExpression<string>;
  modifyTimeSec: FieldExpression<number>;
  participants: FieldExpression<string>;
  /** 事务名称 */
  transName: FieldExpression<string>;
  /** 恢复次数 */
  tryCount: FieldExpression<number>;
  /** 事务创建时间 */
  txCreateTime: FieldExpression<string>;
  txMode: FieldExpression<number>;
  /** 事务状态 */
  txStatus: FieldExpression<number>;
  /** 事务ID，全局唯一 */
  xid: FieldExpression<string>;
  using(client: DaoServiceClient): QGtxTrans;
}

declare namespace ds {
  export class SzFreight extends BaseModel {
    public actualPayer?: string;
    public agentcyFeeType?: string;
    public agreementCurrency?: string;
    public agreementRate?: number & string;
    public allocatedAmount?: number & string;
    public allocationNo?: string;
    public allocationStatus?: string;
    public applyStatus?: string;
    public associatingCode?: string;
    public audit?: number;
    public auditBatchno?: string;
    public auditKtl?: string;
    public auditPerson?: string;
    public auditPersonName?: string;
    public auditTime?: string;
    public blType?: string;
    public bmsId?: string;
    public bmsUpDate?: string;
    public bmsUpFlag?: string;
    public bmsUpPerson?: string;
    public businessDate?: string;
    public businessTypeNo?: string;
    public carrierId?: string;
    public cashMovementNo?: string;
    public chargedDate?: string;
    public chargeWeight?: number & string;
    public cntCompany?: string;
    public cntNo?: string;
    public codesales?: string;
    public commisionId?: string;
    public commitTime?: string;
    public commitUserid?: string;
    public commitUsername?: string;
    public compId?: string;
    public completed?: number;
    public completeDate?: string;
    public completePerson?: string;
    public completePersonName?: string;
    public compStatus?: number;
    public confirmId?: string;
    public confirmNo?: string;
    public contactPerson?: string;
    public ctnSizeType?: string;
    public custId?: string;
    public custName?: string;
    public estimatedInvoiceType?: string;
    public estimatedTaxes?: number & string;
    public estimatedTaxRate?: number & string;
    public exchangeRate?: number & string;
    public exportDate?: string;
    public exportFlag?: string;
    public exportOffice?: string;
    public exportPersion?: string;
    public externalAccessSign?: string;
    public fileAmount?: number & string;
    public freightId?: string;
    public freightRate?: string;
    public freightSource?: string;
    public frtExport?: number;
    public frtId?: string;
    public frtMode?: string;
    public frtName?: string;
    public frtStype?: string;
    public frtType?: string;
    public innerRpFreightId?: string;
    public inputDate?: string;
    public inputOffice?: string;
    public inputPerson?: string;
    public inputPersonName?: string;
    public inputRole?: string;
    public invoiceAmount?: number & string;
    public invoiceId?: string;
    public invoiceNo?: string;
    public invoiceStatus?: string;
    public isCash?: number;
    public isCharged?: number;
    public isCommit?: number;
    public isContract?: number;
    public isEdiEpayOut?: number;
    public isFromQuotedprice?: number;
    public isInnerRp?: number;
    public isInput?: number;
    public isReplace?: number;
    public isSameprice?: number;
    public isVirSettle?: number;
    public isXt?: number;
    public itemType?: string;
    public jobOrderId?: string;
    public ledgerCurrency?: string;
    public ledgerRate?: number & string;
    public linkNo?: string;
    public masterItemId?: string;
    public modifyLastPerson?: string;
    public modifyLastTime?: string;
    public needAllocate?: number;
    public needAudit?: number;
    public needPrint?: number;
    public officeDept?: string;
    public opId?: string;
    public opName?: string;
    public orderNo?: string;
    public paymentNo?: string;
    public payStatus?: string;
    public payTerm?: string;
    public priceType?: string;
    public quantity?: number;
    public quoteAmount?: number & string;
    public quoteCurrency?: string;
    public quoteUnitPrice?: number & string;
    public rateToUsd?: number & string;
    public reCntrFreightId?: string;
    public reFreightId?: string;
    public remark?: string;
    public requestableAmount?: number & string;
    public requestAmount?: number & string;
    public requestId?: string;
    public requestNo?: string;
    public requestStatus?: string;
    public reSettlementId?: string;
    public rpId?: string;
    public rpPerson?: string;
    public rpPersonName?: string;
    public rpRelationId?: string;
    public rpStauts?: number;
    public salesAmount?: number & string;
    public salesCurrency?: string;
    public salesoffice?: string;
    public salesUnitPrice?: number & string;
    public settleAmount?: number & string;
    public settleCurrency?: string;
    public settleOffice?: string;
    public settlePlace?: string;
    public subKeyId?: string;
    public systemNo?: string;
    public taxFormula?: string;
    public testCount?: string;
    public timestamp?: number;
    public transactionDate?: string;
    public transactionOrderNo?: string;
    public unit?: string;
    public uniteNo?: string;
    public unitPrice?: number & string;
    public validDate?: string;
    public vesselAgencyId?: string;
    public virInvoiceNo?: string;
    public xchgRate?: number & string;
    public xtFreightId?: string;
  }
  const QSzFreight: QSzFreight;

  export class WaybillRouteNode extends BaseModel {
    public waybillRouteNodeId?: number;
    public arrivalSiteName?: string;
    public siteNum?: number;
    public startingSiteName?: string;
    public waybillId?: number;
  }
  const QWaybillRouteNode: QWaybillRouteNode;

  export class WaybillInfo extends BaseModel {
    public waybillId?: number;
    public collectDatetime?: string;
    public collectEmployeeCname?: string;
    public collectEmployeeId?: number;
    public collectEmployeeMobile?: string;
    public consigneeCname?: string;
    public consigneeMobile?: string;
    public deliveryAddressDetail?: string;
    public deliveryAreaCode?: string;
    public productTypeCode?: string;
    public sendAddressDetail?: string;
    public sendAreaCode?: string;
    public shipperCname?: string;
    public shipperMobile?: string;
  }
  const QWaybillInfo: QWaybillInfo;

  export class SbCust extends BaseModel {
    public active?: number;
    public addr?: string;
    public addrNative?: string;
    public applicationFormalDate?: string;
    public applicationFormalUser?: string;
    public applicationFormalUserName?: string;
    public applicationFrtDate?: string;
    public applicationFrtUser?: string;
    public applicationFrtUserName?: string;
    public approvedCustId?: string;
    public approvedCustName?: string;
    public belongFreight?: string;
    public blContent?: string;
    public blPrefix?: string;
    public businessNature?: string;
    public cityId?: string;
    public cityName?: string;
    public collectionPersonId?: string;
    public collectionPersonName?: string;
    public contact?: string;
    public countryId?: string;
    public creditAmt?: number & string;
    public creditCurrency?: string;
    public creditDays?: number;
    public creditInvalidationDate?: string;
    public creditNo?: string;
    public creditRemark?: string;
    public creditType?: string;
    public custAlias?: string;
    public custAliasCn?: string;
    public custId?: string;
    public custInnerOuter?: string;
    public custName?: string;
    public custNameNative?: string;
    public customsNo?: string;
    public custType?: number;
    public deleted?: number;
    public deletedReason?: number;
    public dragCtnPlace?: string;
    public dueType?: string;
    public ediCode?: string;
    public ein?: string;
    public email?: string;
    public endDate?: string;
    public fax?: string;
    public forward2Code?: string;
    public forwardCode?: string;
    public grade?: string;
    public homepage?: string;
    public idstring1?: string;
    public idstring2?: string;
    public idstring3?: string;
    public inputDate?: string;
    public inputOffice?: string;
    public inputOfficeCode?: string;
    public inputRole?: string;
    public inputUser?: string;
    public inputUserName?: string;
    public invAddr?: string;
    public invTitle?: string;
    public isCeInv?: number;
    public isCheckOrderOnline?: number;
    public isEdo?: number;
    public isOnline?: number;
    public isOoCarrier2?: number;
    public isProfit?: number;
    public isShowIzCust?: number;
    public ledgerCode?: string;
    public logic1?: string;
    public logic2?: string;
    public loginName?: string;
    public mdgBuGroup?: string;
    public mdgFaxExtens?: string;
    public mdgLangu?: string;
    public mdgMobNumber?: string;
    public mdgPartner?: string;
    public mdgRegion?: string;
    public mdgTelExtens?: string;
    public modidyUserName?: string;
    public modifyDate?: string;
    public modifyLastTime?: string;
    public modifyUser?: string;
    public needCargoTracking?: number;
    public pwd?: string;
    public registeredCapital?: number & string;
    public relateBussinessUser?: string;
    public relatedOffice?: string;
    public relateUser?: string;
    public remarkD?: string;
    public remCode?: string;
    public startDate?: string;
    public stateId?: string;
    public status?: string;
    public superiorId?: string;
    public superiorIdList?: string;
    public superiorName?: string;
    public taxNumber?: string;
    public taxRegisterNo?: string;
    public tel?: string;
    public unactive?: string;
    public vip?: string;
    public webProtocolEndDate?: string;
    public webProtocolNo?: string;
    public zip?: string;
  }
  const QSbCust: QSbCust;

  export class Dept extends BaseModel {
    public deptId?: number;
    public deptName?: string;
    public principalGroupCode?: string;
      public information?: object;
  }
  const QDept: QDept;

  export class UserDeleteTest extends BaseModel {
    public id?: number;
    public password?: string;
    public username?: string;
  }
  const QUserDeleteTest: QUserDeleteTest;

  export class UserExportTest extends BaseModel {
    public id?: number;
    public password?: string;
    public username?: string;
  }
  const QUserExportTest: QUserExportTest;

  export class RpLedgerItem extends BaseModel {
    public ledgerItemId?: string;
    public accountDissectionId?: string;
    public actualBaseCurrencyValue?: number & string;
    public actualInvoiceType?: string;
    public actualRateBase?: number & string;
    public actualTaxes?: number & string;
    public actualTaxRate?: number & string;
    public allocableBaseCurrencyValue?: number & string;
    public allocablePrimeCurrencyValue?: number & string;
    public allocableUsdValue?: number & string;
    public allocatedBaseCurrencyValue?: number & string;
    public allocatedPrimeCurrencyValue?: number & string;
    public allocatedUsdValue?: number & string;
    public allocationNo?: string;
    public applyBaseCurrencyCode?: string;
    public applyBaseCurrencyValue?: number & string;
    public applyPrimeCurrencyCode?: string;
    public applyPrimeCurrencyValue?: number & string;
    public applyUsdValue?: number & string;
    public approveBaseValue?: number & string;
    public approvePrimeValue?: number & string;
    public approveStatus?: string;
    public approveUsdValue?: number & string;
    public balanceTo?: string;
    public businessDate?: string;
    public businessId?: string;
    public cashMovementId?: string;
    public closeDate?: string;
    public collectBillDate?: string;
    public collectBillId?: string;
    public collectFlag?: number;
    public commissinAmount?: number & string;
    public commissionRate?: number & string;
    public compDate?: string;
    public compId?: string;
    public completeDate?: string;
    public completePerson?: string;
    public completePersonName?: string;
    public compNo?: string;
    public controlGlCoaCode?: string;
    public description?: string;
    public documentLocationReference?: string;
    public dueDate?: string;
    public estimatedInvoiceType?: string;
    public estimatedTaxes?: number & string;
    public estimatedTaxRate?: number & string;
    public externalPartnerCode?: string;
    public externalPartnerName?: string;
    public fiscalPeriod?: string;
    public freightInputDate?: string;
    public freightInputPerson?: string;
    public freightInputPersonName?: string;
    public glArpBusinessNo?: string;
    public glArpCoaCode?: string;
    public glArpFiscalPeriod?: string;
    public glArpVoucherId?: string;
    public glCostBusinessNo?: string;
    public glCostCoaCode?: string;
    public glCostFiscalPeriod?: string;
    public glCostVoucherId?: string;
    public glRateBase?: number & string;
    public glRateUsd?: number & string;
    public glTaxBusinessNo?: string;
    public glTaxFiscalPeriod?: string;
    public glTaxVoucherId?: string;
    public includeCommission?: number;
    public inputBatchNo?: string;
    public inputDate?: string;
    public inputOffice?: string;
    public inputPerson?: string;
    public inputPersonName?: string;
    public inputRole?: string;
    public invoiceBaseValue?: number & string;
    public invoiceNo?: string;
    public invoicePrimeValue?: number & string;
    public invoiceStatus?: string;
    public invoiceUsdValue?: number & string;
    public isCash?: number;
    public isInternal?: number;
    public isManual?: number;
    public isTaxDifference?: number;
    public itemType?: string;
    public ledgerItemStateInd?: number;
    public ledgerPartnerCode?: string;
    public ledgerPartnerName?: string;
    public ledgerTypeCode?: string;
    public linkNo?: string;
    public modifyLastTime?: string;
    public officeId?: string;
    public opId?: string;
    public opName?: string;
    public orderNo?: string;
    public payTerm?: string;
    public relatedArId?: string;
    public requestedBaseValue?: number & string;
    public requestedPrimeValue?: number & string;
    public requestedUsdValue?: number & string;
    public requestNo?: string;
    public requestStatus?: string;
    public reSettlementId?: string;
    public rpFrtId?: string;
    public rpFrtName?: string;
    public rpFrtStype?: string;
    public rpFrtType?: string;
    public rpId?: string;
    public rpPerson?: string;
    public rpPersonName?: string;
    public rpStauts?: number;
    public salesoffice?: string;
    public settlementRemarks?: string;
    public sourceId?: string;
    public sourceType?: string;
    public subTypeCode?: string;
    public subTypeCode2?: string;
    public systemType?: string;
    public taxFormula?: string;
  }
  const QRpLedgerItem: QRpLedgerItem;

  export class CsCust extends BaseModel {
    public csCustId?: number;
    public active?: string;
    public addrCn?: string;
    public addrEn?: string;
    public aicRegisteredNo?: string;
    public bizCsCustId?: string;
    public bizSystemType?: string;
    public cdhCode?: string;
    public cdhMaximum?: string;
    public cityCode?: string;
    public cityName?: string;
    public clientNo?: string;
    public countryCode?: string;
    public countryNameCn?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public csFlag?: string;
    public custAlias?: string;
    public custCode?: string;
    public custNameCn?: string;
    public custNameEn?: string;
    public custOfficeCode?: string;
    public custOfficeName?: string;
    public customesRegisteredNo?: string;
    public custStatus?: string;
    public custType?: string;
    public defaultCollectionTerm?: string;
    public defaultPaymentTerm?: string;
    public email?: string;
    public expiryDate?: string;
    public fax?: string;
    public fictitiousPerson?: string;
    public importRemark?: string;
    public invalidName?: string;
    public invalidTime?: string;
    public invoiceMaximum?: string;
    public iqbRegisteredNo?: string;
    public isDeleted?: string;
    public isOneTimeCustomers?: string;
    public isSettlement?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public lndustryType?: string;
    public mdgCustCode?: string;
    public memoryCode?: string;
    public mobileNo?: string;
    public ownership?: string;
    public principalGroupCode?: string;
    public recordVersion?: number;
    public recoveryDate?: string;
    public registeredCapitqal?: string;
    public registeredDate?: string;
    public registeredTime?: string;
    public remarks?: string;
    public salesChannels?: string;
    public scale?: string;
    public settleCustCode?: string;
    public settleCustName?: string;
    public stakeProportion?: string;
    public stakeRelation?: string;
    public stateCode?: string;
    public stateName?: string;
    public subLndustryType?: string;
    public supplierFlag?: string;
    public taxNature?: string;
    public taxpayerIdentificatioNo?: string;
    public tel?: string;
    public type?: string;
    public unifiedCreditNo?: string;
    public vCdhCode?: string;
    public zip?: string;
  }
  const QCsCust: QCsCust;

  export class SbOffice extends BaseModel {
    public abbrev?: string;
    public active?: number;
    public address?: string;
    public autoInternal?: number;
    public blContent?: string;
    public businessRegisterNo?: string;
    public cityId?: string;
    public cityName?: string;
    public companyId?: string;
    public contactId?: string;
    public countryId?: string;
    public custId?: string;
    public deleted?: number;
    public email?: string;
    public fax?: string;
    public functionType?: string;
    public homeCurrency?: string;
    public inputOffice?: string;
    public inputUser?: string;
    public inputUserName?: string;
    public isCustomer?: number;
    public isDept?: number;
    public isInternal?: number;
    public isSettlementObj?: number;
    public language?: string;
    public modifyLastTime?: string;
    public officeCode?: string;
    public officeId?: string;
    public officeName?: string;
    public officeNativeName?: string;
    public officeRelactionTag?: string;
    public officeType?: string;
    public settleOffice?: string;
    public superiorOfficeId?: string;
    public taxRegisterNo?: string;
    public tel?: string;
    public useSystem?: number;
    public xchgrName?: string;
    public zsjEntityEmpty?: string;
    public zsjOfficeId?: string;
    public zsjOfficeSid?: string;
  }
  const QSbOffice: QSbOffice;

  export class StudentNew extends BaseModel {
    public id?: number;
    public address?: string;
    public age?: number;
    public birthday?: string;
    public confirmPassword?: string;
    public courseId?: number;
    public createTime?: string;
    public creator?: string;
    public email?: string;
    public enrollment?: string;
    public mobile?: string;
    public modifier?: string;
    public modifyTime?: string;
    public money?: number;
    public name?: string;
    public password?: string;
    public score?: number;
    public sex?: string;
    public teacherId?: number;
    public version?: number;
  }
  const QStudentNew: QStudentNew;

  export class UserImportTest extends BaseModel {
    public id?: number;
    public password?: string;
    public username?: string;
  }
  const QUserImportTest: QUserImportTest;

  export class BcFreight extends BaseModel {
    public bcFreightId?: number;
    public actualBaseCurrencyValue?: number & string;
    public actualInvoiceType?: string;
    public actualRateBase?: number & string;
    public actualSettleCustCode?: string;
    public actualSettleCustName?: string;
    public actualTaxes?: number & string;
    public actualTaxRate?: number & string;
    public agreedPaymentDate?: string;
    public agreementCurrencyCode?: string;
    public agreementNo?: string;
    public agreementRate?: number & string;
    public allocableBaseCurrencyValue?: number & string;
    public allocablePrimeCurrencyValue?: number & string;
    public allocatedBaseCurrencyValue?: number & string;
    public allocatedPrimeCurrencyValue?: number & string;
    public allocationDate?: string;
    public allocationExchangeRate?: number & string;
    public allocationNo?: string;
    public allocationStatus?: string;
    public assignableAmount?: number & string;
    public attachmentFlag?: string;
    public auditDate?: string;
    public auditPersonCode?: string;
    public auditPersonName?: string;
    public auditStatus?: string;
    public baseCurrencyCode?: string;
    public baseCurrencyValue?: number & string;
    public bcAllocationEventId?: number;
    public bcChargeId?: number;
    public bcChequeId?: number;
    public bcInvoiceId?: number;
    public bcLedgerCompId?: number;
    public bcPaymentRequestDocId?: number;
    public bcPaymentRequestId?: number;
    public bcPublicOrderId?: number;
    public bizReplaceId?: string;
    public bizSystemFreightId?: string;
    public bizSystemOrderId?: string;
    public bizSystemType?: string;
    public businessCode?: string;
    public businessName?: string;
    public businessOrderId?: string;
    public businessType?: string;
    public chargedDate?: string;
    public chargeExpression?: string;
    public chequeNo?: string;
    public cntId?: string;
    public cntNo?: string;
    public cntType?: string;
    public compNo?: string;
    public compNoBatch?: string;
    public compStatus?: string;
    public confirmNo?: string;
    public confirmStatus?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public deliveryJobNo?: string;
    public diffTaxes?: number & string;
    public diffTaxesArpFiscalPeriod?: string;
    public diffTaxesVoucherId?: number;
    public estimatedAmount?: number & string;
    public estimatedInvoiceType?: string;
    public estimatedInvoiceTypeName?: string;
    public estimatedTaxes?: number & string;
    public estimatedTaxRate?: number & string;
    public exchangeRate?: number & string;
    public feeRemark?: string;
    public freightBeginDate?: string;
    public freightCode?: string;
    public freightEndDate?: string;
    public freightNameCn?: string;
    public freightSource?: string;
    public freightType?: string;
    public frtBizTypeCode?: string;
    public frtBizTypeName?: string;
    public glArpFiscalPeriod?: string;
    public glRateBase?: number & string;
    public glVoucherDate?: string;
    public glVoucherId?: number;
    public hblNo?: string;
    public invoiceCode?: string;
    public invoiceNo?: string;
    public invoiceSerialNo?: string;
    public invoiceStatus?: string;
    public isCharged?: string;
    public isCommitGlVoucher?: string;
    public isDataCleaned?: string;
    public isDiffTaxes?: string;
    public isEdiEpayOut?: string;
    public isInternalFrt?: string;
    public isInvoice?: string;
    public isNotInvoice?: string;
    public isReplace?: string;
    public isSpot?: string;
    public isTax?: string;
    public isTaxFree?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public ledgerTypeCode?: string;
    public listNo?: string;
    public mblNo?: string;
    public noOfPeriod?: number;
    public payTerm?: string;
    public principalGroupCode?: string;
    public quantity?: number & string;
    public receivedStatus?: string;
    public recordVersion?: number;
    public remark?: string;
    public replaceId?: number;
    public replaceTypeCode?: string;
    public replaceTypeName?: string;
    public requestApproveStatus?: string;
    public requestNo?: string;
    public requestStatus?: string;
    public returnDepositNo?: string;
    public rpFlag?: string;
    public settleAmount?: number & string;
    public settleCurrencyCode?: string;
    public settleCustCode?: string;
    public settleCustDeptCode?: string;
    public settleCustDeptName?: string;
    public settleCustName?: string;
    public settlementRatio?: number & string;
    public settleOffice?: string;
    public settleOfficeDeptCode?: string;
    public settleOfficeDeptName?: string;
    public settleOfficeName?: string;
    public sourceCtnId?: string;
    public sourceFreightId?: number;
    public sourceOrderCtn?: string;
    public subOrderNo?: string;
    public taskCode?: string;
    public taskName?: string;
    public transferTaxes?: number & string;
    public unit?: string;
    public unitPrice?: number & string;
    public vehicleBrand?: string;
    public whCode?: string;
    public whName?: string;
    public writeoffId?: number;
    public writeoffStatus?: string;
    public writeoffType?: string;
  }
  const QBcFreight: QBcFreight;

  export class WaybillFee extends BaseModel {
    public waybillId?: number;
    public insuranceFee?: number;
    public totalFreight?: number & string;
    public volume?: number & string;
    public weight?: number & string;
  }
  const QWaybillFee: QWaybillFee;

  export class SbCodedict extends BaseModel {
    public bmsId?: string;
    public codeId?: string;
    public codeType?: string;
    public codeValue?: string;
    public displayValue?: string;
    public displayValueCn?: string;
    public modifiable?: number;
    public modifyLastTime?: string;
    public relateValue?: string;
  }
  const QSbCodedict: QSbCodedict;

  export class DictAreaInfoBak extends BaseModel {
    public areaCode?: string;
    public areaFullName?: string;
    public areaShortName?: string;
  }
  const QDictAreaInfoBak: QDictAreaInfoBak;

  export class ExportConfig extends BaseModel {
    public id?: string;
    public async?: boolean;
    public className?: string;
    public columnSetting?: string;
    public dictionaryUrl?: string;
    public fileName?: string;
    public pageSize?: number;
    public printMode?: boolean;
    public sourceUrl?: string;
    public statisticsUrl?: string;
    public template?: any;
  }
  const QExportConfig: QExportConfig;

  export class MdFreightCode extends BaseModel {
    public mdFreightCodeId?: number;
    public active?: string;
    public bizSystemId?: string;
    public bizSystemType?: string;
    public businessType?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public currency?: string;
    public feightGlobalName?: string;
    public freightCode?: string;
    public freightGlobalCode?: string;
    public freightNameCn?: string;
    public freightNameEn?: string;
    public freightType?: string;
    public invoiceFreightCode?: string;
    public invoiceName?: string;
    public isDeleted?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public memoryCode?: string;
    public principalGroupCode?: string;
    public recordVersion?: number;
    public remark?: string;
    public reportName?: string;
    public settleOffice?: string;
    public settleOfficeName?: string;
    public shortName?: string;
  }
  const QMdFreightCode: QMdFreightCode;

  export class Children extends BaseModel {
    public id?: number;
    public age?: number;
    public childName?: string;
    public createTime?: string;
    public creator?: string;
    public destroyed?: boolean;
    public englishName?: string;
    public enrollmentDate?: string;
    public giftCode?: string;
    public giftId?: number;
    public graduationDate?: string;
    public mailbox?: string;
    public mobile?: string;
    public modifier?: string;
    public modifyTime?: string;
    public parentsMobile?: string;
    public phone?: string;
    public schoolAge?: number;
    public sex?: boolean;
    public userAttribute?: string;
    public version?: number;
  }
  const QChildren: QChildren;

  export class I18nMessages extends BaseModel {
    public id?: number;
    public key?: string;
    public localeId?: number;
    public message?: string;
  }
  const QI18nMessages: QI18nMessages;

  export class Course extends BaseModel {
    public id?: number;
    public courseContent?: string;
    public courseName?: string;
    public courseNum?: number;
    public createTime?: string;
    public creator?: string;
    public destroyed?: boolean;
    public modifier?: string;
    public modifyTime?: string;
    public userAttribute?: string;
    public version?: number;
  }
  const QCourse: QCourse;

  export class UserAddTest extends BaseModel {
    public id?: number;
    public password?: string;
    public username?: string;
  }
  const QUserAddTest: QUserAddTest;

  export class UserUpdateTest extends BaseModel {
    public id?: number;
    public password?: string;
    public username?: string;
  }
  const QUserUpdateTest: QUserUpdateTest;

  export class TimerVersion extends BaseModel {
    public timerId?: number;
    public identifier?: string;
    public modifyTime?: string;
    public version?: number;
  }
  const QTimerVersion: QTimerVersion;

  export class SupportedLocale extends BaseModel {
    public id?: number;
    public country?: string;
    public display?: string;
    public language?: string;
    public state?: string;
    public variant?: string;
  }
  const QSupportedLocale: QSupportedLocale;

  export class BcPublicOrder extends BaseModel {
    public bcPublicOrderId?: number;
    public acLockDate?: string;
    public acLockPersonCode?: string;
    public acLockPersonName?: string;
    public acLockStatus?: string;
    public auditDate?: string;
    public auditPersonCode?: string;
    public auditPersonName?: string;
    public auditStatus?: string;
    public berthingTime?: string;
    public bppCode?: string;
    public bppName?: string;
    public cimcId?: string;
    public cimcNo?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public discArea?: string;
    public feeRemark?: string;
    public flightNo?: string;
    public flowDirection?: string;
    public grossInterest?: number & string;
    public isIndependent?: string;
    public isInternalFrt?: string;
    public isNvocc?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public loadArea?: string;
    public mfLine?: string;
    public mfLineCode?: string;
    public parentOrderId?: string;
    public parentOrderNo?: string;
    public parentSubOrderId?: string;
    public parentSubOrderNo?: string;
    public paymentInterest?: number & string;
    public payTerm?: string;
    public payTypeCode?: string;
    public principalGroupCode?: string;
    public publicApprovalDate?: string;
    public publicApprovalFiscalPeriod?: string;
    public publicApprovalPersonCode?: string;
    public publicApprovalPersonName?: string;
    public publicApprovalRemark?: string;
    public publicAta?: string;
    public publicAtd?: string;
    public publicBizSystemType?: string;
    public publicBookingAgencyCode?: string;
    public publicBookingAgencyName?: string;
    public publicBookingProtocolNo?: string;
    public publicBusinessBegDate?: string;
    public publicBusinessDate?: string;
    public publicBusinessEndDate?: string;
    public publicBusinessFinishDate?: string;
    public publicBusinessOrderId?: string;
    public publicBusinessType?: string;
    public publicBusinessTypeName?: string;
    public publicCanvassionDepartment?: string;
    public publicCanvassionDeptCode?: string;
    public publicCanvassionMode?: string;
    public publicCargoDescriptionCn?: string;
    public publicCargoDescriptionEn?: string;
    public publicCarrierCode?: string;
    public publicCarrierName?: string;
    public publicChargingWeight?: number & string;
    public publicChargingWeightUnit?: string;
    public publicConsigneeCode?: string;
    public publicConsigneeName?: string;
    public publicConsignorCode?: string;
    public publicConsignorName?: string;
    public publicContactName?: string;
    public publicCooperatorOfficeCode?: string;
    public publicCooperatorOfficeName?: string;
    public publicCsCode?: string;
    public publicCsName?: string;
    public publicCtnNo?: string;
    public publicCtnNum?: string;
    public publicCtnTeu?: string;
    public publicCube?: number & string;
    public publicCubeUnit?: string;
    public publicCustBusinessNo?: string;
    public publicCustomNo?: string;
    public publicDestAgentCode?: string;
    public publicDestAgentName?: string;
    public publicEstimatedCompDate?: string;
    public publicEstimatedIssueDate?: string;
    public publicEta?: string;
    public publicEtd?: string;
    public publicFwPartnerCode?: string;
    public publicFwPartnerName?: string;
    public publicGoOrderId?: number;
    public publicGrossWeight?: number & string;
    public publicGrossWeightUnit?: string;
    public publicHblNo?: string;
    public publicIsApproval?: string;
    public publicIsCustomsClearance?: string;
    public publicIsHbl?: string;
    public publicIsInspection?: string;
    public publicIsInsurance?: string;
    public publicIsTruck?: string;
    public publicIsWarehouse?: string;
    public publicJobNo?: string;
    public publicMblNo?: string;
    public publicNoOfPackage?: number;
    public publicNotifyCode?: string;
    public publicNotifyName?: string;
    public publicOpCode?: string;
    public publicOperateType?: string;
    public publicOperateTypeName?: string;
    public publicOpName?: string;
    public publicOrderRemark?: string;
    public publicOrgId?: string;
    public publicOverseaOfficeCode?: string;
    public publicOverseaOfficeName?: string;
    public publicPackageType?: string;
    public publicPackageTypeName?: string;
    public publicPaymentMode?: string;
    public publicPod?: string;
    public publicPodCode?: string;
    public publicPol?: string;
    public publicPolCode?: string;
    public publicPortOfDestCode?: string;
    public publicPortOfDestination?: string;
    public publicProjectId?: number;
    public publicSalesCode?: string;
    public publicSalesName?: string;
    public publicSettleOffice?: string;
    public publicSettleOfficeName?: string;
    public publicShipperCode?: string;
    public publicShipperName?: string;
    public publicSourceType?: string;
    public publicSubBusinessType?: string;
    public publicTransportTerm?: string;
    public publicVesselCode?: string;
    public publicVesselName?: string;
    public publicVesselNameCn?: string;
    public publicVoyage?: string;
    public receiveInterest?: number & string;
    public recordVersion?: number;
    public smallSingleNo?: string;
    public voucherLockDate?: string;
    public voucherLockPersonCode?: string;
    public voucherLockPersonName?: string;
    public voucherLockStatus?: string;
  }
  const QBcPublicOrder: QBcPublicOrder;

  export class Teacher extends BaseModel {
    public id?: number;
    public createTime?: string;
    public creator?: string;
    public destroyed?: boolean;
    public modifier?: string;
    public modifyTime?: string;
    public studentId?: number;
    public teacherAge?: number;
    public teacherName?: string;
    public userAttribute?: string;
    public version?: number;
    public sex?: string;
  }
  const QTeacher: QTeacher;

  export class Student extends BaseModel {
    public id?: number;
    public address?: string;
    public age?: number;
    public birthday?: string;
    public confirmPassword?: string;
    public courseId?: number;
    public createTime?: string;
    public creator?: string;
    public destroyed?: boolean;
    public email?: string;
    public enrollment?: string;
    public mobile?: string;
    public modifier?: string;
    public modifyTime?: string;
    public money?: number & string;
    public name?: string;
    public password?: string;
    public score?: number;
    public sex?: boolean;
    public teacherId?: number;
    public userAttribute?: string;
    public version?: number;
    public fileKey?: string;
  }
  const QStudent: QStudent;

  export class RpPublicOrder extends BaseModel {
    public azAgentName?: string;
    public azCarrierName?: string;
    public azConsigneeName?: string;
    public azEta?: string;
    public azEtd?: string;
    public azFlightNo?: string;
    public azIoInd?: string;
    public azNotifyName?: string;
    public azOperatorName?: string;
    public azOrderHbl?: string;
    public azSalesOfficeName?: string;
    public azServiceName?: string;
    public azShipperName?: string;
    public azSoourceMode?: string;
    public azSupplierName?: string;
    public cnCntNo?: string;
    public cnCntOperator?: string;
    public cnCntSealNo?: string;
    public cnCntSizetype?: string;
    public cnCntStatus?: string;
    public cnCntUserCode?: string;
    public cnDangerFlag?: string;
    public cnDeliveryPlace?: string;
    public cnDischargeArea?: string;
    public cnHaulierCode?: string;
    public cnIeFlag?: string;
    public cnJobType?: string;
    public cnLoadAreaCode?: string;
    public cnReturnPlace?: string;
    public cnSocFlag?: string;
    public huBerthingTime?: string;
    public huEtaTime?: string;
    public huEtdTime?: string;
    public huExpVoyageCode?: string;
    public huImpVoyageCode?: string;
    public huSailingTime?: string;
    public huShipCnName?: string;
    public inputCompanyId?: string;
    public inputDate?: string;
    public inputOfficeId?: string;
    public inputPerson?: string;
    public isNotax?: string;
    public modifyLastTime?: string;
    public ooAgentName?: string;
    public ooConsigneeName?: string;
    public ooCustOrderId?: string;
    public ooEta?: string;
    public ooEtd?: string;
    public ooFwPartnerId?: string;
    public ooFwPartnerName?: string;
    public ooHblNo?: string;
    public ooLinedefId?: string;
    public ooOperatorName?: string;
    public ooPrecarrierName?: string;
    public ooSalesOfficeName?: string;
    public ooServiceName?: string;
    public ooShipAgentName?: string;
    public ooShipperName?: string;
    public ooSourceMode?: string;
    public ooSourceModeName?: string;
    public publicBkNo?: string;
    public publicBlNo?: string;
    public publicBusinessDate?: string;
    public publicCompletedSign?: number;
    public publicConsignorFullname?: string;
    public publicConsignorName?: string;
    public publicContactName?: string;
    public publicCooperatorOfficeId?: string;
    public publicCooperatorOfficeName?: string;
    public publicCustomNo?: string;
    public publicDestinalPlace?: string;
    public publicJobNo?: string;
    public publicOrderId?: string;
    public publicOverseaOfficeId?: string;
    public publicOverseaOfficeName?: string;
    public publicPodName?: string;
    public publicPolName?: string;
    public publicSalesId?: string;
    public publicSalesName?: string;
    public publicSourceAgentId?: string;
    public publicSourceAgentName?: string;
    public publicVesselName?: string;
    public publicVesselNameCn?: string;
    public publicVoyage?: string;
    public refBusinessId?: string;
    public refBusinessType?: string;
    public refSystemType?: string;
    public seBookingParty?: string;
    public seCarrierName?: string;
    public seConsignee?: string;
    public seEtdTime?: string;
    public seLoadAreaCode?: string;
    public seMovementDisch?: string;
    public seMovementLoading?: string;
    public sePayTypeCode?: string;
    public seSailingTime?: string;
    public seSndEnVessel?: string;
    public seSndVoyageCode?: string;
    public siBerthingTime?: string;
    public siCarrierId?: string;
    public siCarrierName?: string;
    public siConsignee?: string;
    public siDiscAreaCode?: string;
    public siEtaTime?: string;
    public siImpVoyageCode?: string;
    public siLoadAreaCode?: string;
    public siMovementDischar?: string;
    public siMovementLoading?: string;
    public siPayTypeCode?: string;
    public siPreBlNo?: string;
    public siPreShipEnName?: string;
    public siPreVoyageNo?: string;
  }
  const QRpPublicOrder: QRpPublicOrder;

  export class Shop extends BaseModel {
    public shopId?: number;
    public giftShop?: string;
    public version?: number;
  }
  const QShop: QShop;

  export class Gift extends BaseModel {
    public id?: number;
    public createTime?: string;
    public creator?: string;
    public destroyed?: boolean;
    public giftCode?: string;
    public giftName?: string;
    public modifier?: string;
    public modifyTime?: string;
    public productionYear?: number;
    public shopId?: number;
    public userAttribute?: string;
    public version?: number;
  }
  const QGift: QGift;

  export class UserSelectTest extends BaseModel {
    public id?: number;
    public password?: string;
    public username?: string;
  }
  const QUserSelectTest: QUserSelectTest;

  export class Employee extends BaseModel {
    public employeeId?: number;
    public address?: string;
    public age?: number;
    public birthDay?: string;
    public cname?: string;
    public createTime?: string;
    public creator?: string;
    public deptId?: number;
    public destroyed?: boolean;
    public email?: string;
    public mobile?: string;
    public modifier?: string;
    public modifyTime?: string;
    public password?: string;
    public principalGroupCode?: string;
    public sex?: boolean;
    public username?: string;
    public version?: number;
  }
  const QEmployee: QEmployee;

  export class MdCodeDict extends BaseModel {
    public mdCodeDictId?: number;
    public active?: string;
    public codeType?: string;
    public codeValue?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public displayValue?: string;
    public displayValueCn?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public mdCodeTypeId?: number;
    public principalGroupCode?: string;
    public recordVersion?: number;
    public relateValue?: string;
    public remark?: string;
    public serialNumber?: number;
    public settleOffice?: string;
    public settleOfficeName?: string;
    public tmpPId?: number;
    public tmpSeqId?: number;
  }
  const QMdCodeDict: QMdCodeDict;

  export class GlVoucher extends BaseModel {
    public glVoucherId?: number;
    public attachment?: number & string;
    public coaName?: string;
    public companyCode?: string;
    public companyName?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public departmentCode?: string;
    public externalVoucherNo?: string;
    public fiscalPeriod?: string;
    public isDiffTaxes?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public principalGroupCode?: string;
    public profitCenter?: string;
    public recordVersion?: number;
    public referenceCode?: string;
    public seqNo?: string;
    public transactionNo?: string;
    public transactionSource?: string;
    public validateUser?: string;
    public validateUserName?: string;
    public voucherCategory?: string;
    public voucherDate?: string;
    public voucherExportPerson?: string;
    public voucherExportPersonName?: string;
    public voucherExportState?: string;
    public voucherExportTime?: string;
    public voucherNo?: string;
    public voucherRemarks?: string;
    public voucherState?: string;
    public voucherType?: string;
  }
  const QGlVoucher: QGlVoucher;

  export class ImportConfig extends BaseModel {
    public id?: string;
    public allowParameter?: boolean;
    public async?: boolean;
    public childrenTable?: string;
    public className?: string;
    public dealService?: string;
    public defineColumn?: string;
    public dictionaryUrl?: string;
    public methodName?: string;
    public primaryColumns?: string;
    public template?: any;
    public validateHead?: boolean;
    public validateMethod?: string;
  }
  const QImportConfig: QImportConfig;

  export class AppNodes extends BaseModel {
    public id?: number;
    public appName?: string;
    public nodeName?: string;
    public nodeNum?: number;
  }
  const QAppNodes: QAppNodes;

  export class DictProductType extends BaseModel {
    public productCode?: string;
    public productName?: string;
  }
  const QDictProductType: QDictProductType;

  export class MdGlobalBusiness extends BaseModel {
    public mdSubBusinessGlobalId?: number;
    public active?: string;
    public createOffice?: string;
    public createTime?: string;
    public createTimeZone?: string;
    public creator?: string;
    public isDeleted?: string;
    public isTaxFree?: string;
    public lastModifyOffice?: string;
    public lastModifyor?: string;
    public lastModifyTime?: string;
    public lastModifyTimeZone?: string;
    public principalGroupCode?: string;
    public recordVersion?: number;
    public remark?: string;
    public subBusinessGlobalCode?: string;
    public subBusinessGlobalName?: string;
  }
  const QMdGlobalBusiness: QMdGlobalBusiness;

  export class ChangeLog extends BaseModel {
    public id?: number;
    public changeData?: string;
    public dataSourceId?: number;
    public modelName?: string;
    public operateTime?: string;
    public operator?: string;
    public sqlStmt?: string;
  }
  const QChangeLog: QChangeLog;

  export class DictAreaInfo extends BaseModel {
    public areaCode?: string;
    public areaFullName?: string;
    public areaShortName?: string;
  }
  const QDictAreaInfo: QDictAreaInfo;

  export class GtxTrans extends BaseModel {
    public gtxTransId?: number;
    public identifier?: string;
    public modifyTime?: string;
    public modifyTimeSec?: number;
    public participants?: string;
    public transName?: string;
    public tryCount?: number;
    public txCreateTime?: string;
    public txMode?: number;
    public txStatus?: number;
    public xid?: string;
  }
  const QGtxTrans: QGtxTrans;
}
// @formatter:on

import {get, post } from '@/utils/request'
export const api = {
    login: (data) => get(process.env.API_HOST + '/recordLogin', data), // 登录
    exit: (data) => get(process.env.API_HOST + '/Logout', {
        sfh: data.sfh,
        name: data.name,
        zhiwu: data.zhiwu,
        jgmcm: data.jgmcm,
        date: data.date
    }), // 退出
    index: {
        userinfo: (data) => get(process.env.API_HOST + '/userinfo', data), // 个人信息
        programList: (data) => get(process.env.API_HOST + '/ProgramList', data), // 方案数据信息
        serviceApplication: (data) => get(process.env.API_HOST + '/ServiceApplication', data), // 我的申请
        approvalList: (data) => get(process.env.API_HOST + '/ApprovalList', data) // 我的审批
    },

    application: {
        docImg: (data) => post(process.env.API_HOST + '/saveMinGanImage', data),
        getDocImg: (data) => get(process.env.API_HOST + '/minGanImage', data),
        //cuih
        //档案
        lidangTree: (data) => get(process.env.API_HOST + '/lidangTree', data), //立档单位树
        get_yonghuxiala: (data) => get(process.env.API_HOST + '/get_yonghuxiala', data), //转接档案/材料-根据接收单位筛选人员
        get_xianshangjieshou: (data) => get(process.env.API_HOST + '/get_xianshangjieshou', data), //转接材料-线上接收
        get_xianshangjieshou_gengduo: (data) => get(process.env.API_HOST + '/get_xianshangjieshou_gengduo', data), //转接材料-线上接收-更多
        get_xianxiajieshou_gengduo: (data) => get(process.env.API_HOST + '/get_xianxiajieshou_gengduo', data), //转接材料-线下接收-更多
        get_xianshangzhuanchu_gengduo: (data) => get(process.env.API_HOST + '/get_xianshangzhuanchu_gengduo', data), //转接材料-线上转出-更多
        get_xianXiaJieShow: (data) => get(process.env.API_HOST + '/get_xianXiaJieShow', data), //转接材料-线下接收
        get_xianshangzhuanchu: (data) => get(process.env.API_HOST + '/get_xianshangzhuanchu', data), //转接材料-线上转出
        jieshourecordlist: (data) => get(process.env.API_HOST + '/jieshourecordlist', data), //转接档案-我的接收
        zhuandirecordlist: (data) => get(process.env.API_HOST + '/zhuandirecordlist', data), //转接档案-我的转出
        get_danganInfo: (data) => get(process.env.API_HOST + '/get_danganInfo', data), //转接档案-档案详情
        Addzhuanjiedangan: (data) => post(process.env.API_HOST + '/Addzhuanjiedangan', data), //转接档案-提交转接档案信息
        add_zhaundicaogao: (data) => post(process.env.API_HOST + '/add_zhaundicaogao', data), //转接档案-保存草稿
        add_shenheqingkuang: (data) => post(process.env.API_HOST + '/add_shenheqingkuang', data), //转接档案-选择审核情况
        baocunjindu: (data) => post(process.env.API_HOST + '/baocunjindu', data), //转接档案-保存进度
        Uptdangantype: (data) => post(process.env.API_HOST + '/Uptdangantype', data), //转接档案-同意接收/确认转出纸质按钮/确认接收纸质按钮
        add_jianyuan: (data) => post(process.env.API_HOST + '/add_jianyuan', data), //转接档案-我的接收-确认接收
        // 材料

        add_xianshangzhuandi: (data) => post(process.env.API_HOST + '/add_xianshangzhuandi', data), //转接材料-线上转出
        add_xianxiazhuandi: (data) => post(process.env.API_HOST + '/add_xianxiazhuandi', data), //转接材料-线下接收
        get_cailiaoxiangqing: (data) => get(process.env.API_HOST + '/get_cailiaoxiangqing', data), //转接材料-详情


        get_cailiaomingcheng: (data) => get(process.env.API_HOST + '/get_cailiaomingcheng', data), //转接材料-材料名称下拉框
        upt_xianxiatype: (data) => post(process.env.API_HOST + '/upt_xianxiatype', data), //转接材料-线下接收-操作
        upt_xianshangtype: (data) => post(process.env.API_HOST + '/upt_xianshangtype', data), //转接材料-线上转出-操作
        upt_zhizhiguidang: (data) => post(process.env.API_HOST + '/upt_zhizhiguidang', data), //转接材料-线下接受-纸质归档
        //zhaoshuaiyan
        shenchainterface: (data) => post(process.env.API_HOST + '/shenchainterface', data), //审查档案确定接口
        danganshencha: (data) => get(process.env.API_HOST + '/danganshencha', data), // 电子扫描档案的目录接口
        shenchadianzimulu: (data) => get(process.env.API_HOST + '/shenchadianzimulu', data), // 档案审查右下表格接口
        danganlist: (data) => get(process.env.API_HOST + '/danganlist', data), // 审查弹框接口
        pulldownmenu: (data) => get(process.env.API_HOST + '/pulldownmenu', data), // 字典下拉数据
        unitsTree: (data) => get(process.env.API_HOST + '/unitsTree', data), // 单位树
        Importdangan: (data) => post(process.env.API_HOST + '/Importdangan', data), // 导入档案
        renyuanxinxi: (data) => get(process.env.API_HOST + '/renyuanxinxi', data), // 人员信息
        peopleInformation: (data) => get(process.env.API_HOST + '/PeopleInformation', data), // 人员信息2
        peopleInformation1: (data) => get(process.env.API_HOST + '/PeopleInformation_daku', data), // 人员信息2
        addprogram: (data) => post(process.env.API_HOST + '/Addprogram', {
            fanganName: data.fanganName,
            fanganType: data.fanganType,
            identity: data.identity,
            fanganQueryObject: data.fanganQueryObject,
            fanganQueryCondition: data.fanganQueryCondition,
            fanganDescription: data.fanganDescription,
            fanganDate: data.fanganDate,
            jgmcm: data.jgmcm
        }), // 保存方案
        deleteprogram: (data) => get(process.env.API_HOST + '/deleteProgram', data), // 删除方案
        programdange: () => get(process.env.API_HOST + '/Programdange'), // 导入方案
        queryCondition: (data) => get(process.env.API_HOST + '/zidianshuju', data), // 查询条件数据
        selectCondition: (data) => get(process.env.API_HOST + '/selectcondition', data), // 查询条件数据
        submitApplication: (data) => post(process.env.API_HOST + '/AddServiceApplication', {
            danwei: data.danwei,
            sqrname: data.sqrname,
            cyrname: data.cyrname,
            ptrname: data.ptrname,
            sfh: data.sfh,
            chayueren: data.chayueren,
            peitongren: data.peitongren,
            yewutype: data.yewutype,
            chadangneirong: data.chadangneirong,
            shiyou: data.shiyou,
            xingshi: data.xingshi,
            bcdr: data.bcdr,
            bcdrxm: data.bcdrxm,
            bcdrjgmcm: data.bcdrjgmcm,
            cdfw: data.cdfw,
            shenqingdate: data.shenqingdate,
            // state: data.state,
            phone: data.phone,
            jgmcm: data.jgmcm,
            sqmc: data.sqmc,
            length: data.length,
            xgbm: data.xgbm,
            kaishi: data.kaishi,
            jieshu: data.jieshu,
            czr: data.czr,
            czlx: data.czlx,
            xgjgmcm: data.xgjgmcm
        }), // 提交申请
        withdraw: (data) => get(process.env.API_HOST + '/UptServiceApplication', data), // 撤回
        again: (data) => get(process.env.API_HOST + '/applyAgain', data), // 再次申请
        agreeAproval: (data) => get(process.env.API_HOST + '/UptApprovalList', data), // 同意
        submitLeader: (data) => get(process.env.API_HOST + '/UptApprovalList1', data), // 同意
        detail_person: (data) => get(process.env.API_HOST + '/ApplicationDetails', data), // 电子档案详情
        addCheck: (data) => get(process.env.API_HOST + '/shujujiaodui', data), // 校对数据，添加人员
        sqlQuery: (data) => get(process.env.API_HOST + '/sqlQuery', data), // sql条件查询
        xaunzefanwei: (data) => get(process.env.API_HOST + '/xaunzefanwei', data), // 选择查询范围
        yanzhengfanwei: (data) => get(process.env.API_HOST + '/yanzhengfanwei', data), // 验证所选范围内有无可查人员
        reject: (data) => get(process.env.API_HOST + '/regect', data), // 驳回
        get_danganxaingqing: (data) => get(process.env.API_HOST + '/get_danganxaingqing', data), // 获取档案列表
        getLogData: (data) => get(process.env.API_HOST + '/findLogDetail', data)
    },
    detail: {
        selectApproval: (data) => get(process.env.API_HOST + '/selectApproval', data), // 审批详情
        shenqingxiangqing: (data) => get(process.env.API_HOST + '/shenqingxiangqing', data), // 申请详情
        applicationDetails: (data) => get(process.env.API_HOST + '/ApplicationDetails', data) // 申请详情
    },
    build: {
        mulupaixu: (data) => post(process.env.API_HOST + '/mulupaixu', data), // 排序档案目录
        getPersonInfo: (data) => get(process.env.API_HOST + '/selectpaper_archives', data), // 获取纸质档案信息
        addpaperArchives: (data) => post(process.env.API_HOST + '/Addpaper_archives', {
            sfh: data.sfh,
            danganhao: data.danganhao,
            // laiyuantype: data.laiyuantype,
            location: data.location,
            state: data.state,
            qjqk: data.qjqk,
            rfid: data.rfid,
            organization: data.organization,
            organizationName: data.organizationName,
            zzs: data.zzs,
            xzzzj: data.xzzzj,
            xzzrq: data.xzzrq,
            sfqj: data.sfqj,
            jiandangdate: data.jiandangdate
        }), // 纸质档案信息录入
        // getPersonDoc: (data) => get(process.env.API_HOST + '/Personal_archives', data), // 获取电子档案信息
        tenTree: (data) => get(process.env.API_HOST + '/Personal_directory', data), // 获取十分法目录树
        twoTree: (data) => get(process.env.API_HOST + '/Personal_directory1', data), // 获取二分法目录树
        createTree: (data) => get(process.env.API_HOST + '/createPersonal_directory', data), // 生成目录树
        addrenyuanmulu: (data) => post(process.env.API_HOST + '/addrenyuanmulu', {
            sfh: data.sfh,
            shifenfa: data.shifenfa,
            erfenfa: data.erfenfa,
            date: data.date
        }),
        getTreeList: (data) => get(process.env.API_HOST + '/xialazidian', data),
        addClass: (data) => post(process.env.API_HOST + '/addrenyuanerjimulu', {
            sfh: data.sfh,
            danganhao: data.danganhao,
            daima: data.daima,
            danwei: data.danwei,
            czr: data.czr,
            IP: data.IP,
            date: data.date,
            jgmcm: data.jgmcm
        }),
        // getTree: (data) => get(process.env.API_HOST + '/Getmulu', data),
        removeTree: (data) => post(process.env.API_HOST + '/delmuluCategory', {
            sfh: data.sfh,
            cldm: data.cldm,
            dah: data.dah,
            danwei: data.danwei,
            czr: data.czr,
            IP: data.IP,
            date: data.date,
            jgmcm: data.jgmcm,
            laiyuan: data.laiyuan
        }), // 删除节点
        unitTreeQuery: (data) => get(process.env.API_HOST + '/el/xitongguanli/unit/query', data), // 加载单位树
        getMaterial: (data) => get(process.env.API_HOST + '/tianjiacailiao', data), // 获取基本属性和专有属性字段
        muluzonglan: (data) => get(process.env.API_HOST + '/muluzonglan', data), // 目录总览
        yulanmulu: (data) => get(process.env.API_HOST + '/yulanmulu', data), // 预览目录
        addMaterial: (data) => post(process.env.API_HOST + '/addcaialio', {
            cailiaodaima: data.cailiaodaima,
            cailiaoleixing: data.cailiaoleixing,
            cailiaoname: data.cailiaoname,
            cailiaotype: data.cailiaotype,
            dichotomyType: data.dichotomyType,
            tyzdz: data.tyzdz,
            zyzdz: data.zyzdz,
            sfh: data.sfh,
            xcdate: data.xcdate
        }), // 添加材料
        get_jianyuanlist: (data) => get(process.env.API_HOST + '/get_jianyuanlist', data), // 加载减员列表
        get_selectjianyuan: (data) => get(process.env.API_HOST + '/get_selectjianyuan', data), // 查询减员信息
        getMaterialData: (data) => get(process.env.API_HOST + '/bianjicailiao', data), // 编辑材料
        saveMaterial: (data) => post(process.env.API_HOST + '/uptcailiao', {
            cailiaodaima: data.cailiaodaima,
            sfh: data.sfh,
            uuid: data.uuid,
            xcdate: data.xcdate,
            cailiaoname: data.cailiaoname,
            tyzdz: data.tyzdz,
            zyzdz: data.zyzdz,
            dichotomyType: data.dichotomyType
        }), // 保存编辑
        finishBuild: (data) => get(process.env.API_HOST + '/shenchamulu', data), // 审查目录
        imageList: (data) => get(process.env.API_HOST + '/imageList', data), // 上传目录回显
        uploadFileToFuWuQi: (data) => post(process.env.API_HOST + '/uploadFileToFuWuQi', data), // 上传目录
        deleteImage: (data) => post(process.env.API_HOST + '/deleteImage', data), // 删除图片
        updateImage: (data) => post(process.env.API_HOST + '/updateImage', data), // 修改图片
        tupianpaixu: (data) => post(process.env.API_HOST + '/tupianpaixu', data), // 排序图片
        systemMessage: (data) => get(process.env.API_HOST + '/systemMessage', data), // 查询消息列表
        messageDetail: (data) => get(process.env.API_HOST + '/messageDetail', data), // 查询消息对话框
        add_zhaundimessage: (data) => get(process.env.API_HOST + '/add_zhaundimessage', data), // 消息对话框发送
        Exportpackage: (data) => get(process.env.API_HOST + '/Exportpackage', data), // 导出档案接口
        sureBuild: (data) => post(process.env.API_HOST + '/wanchengjiandang', {
            sfh: data.sfh,
            name: data.name,
            danganhao: data.danganhao,
            danwei: data.danwei,
            cailiaoxinxi: data.cailiaoxinxi,
            jgmcm: data.jgmcm,
            scrsfh: data.scrsfh,
            scrname: data.scrname,
            scrjgmcm: data.scrjgmcm
        }), // 完成建档
        findMaterialTypeMenu: (data) => get(process.env.API_HOST + '/findMaterialTypeMenu', data), // 一级节点目录
        addMaterialType: (data) => post(process.env.API_HOST + '/addMaterialType', {
            sfh: data.sfh,
            clmc: data.clmc,
            sqms: data.sqms,
            imgUrl: '',
            cldm: data.cldm,
            lbmc: data.lbmc
        }),
        addMaterialName: (data) => post(process.env.API_HOST + '/addMaterialName', {
            sfh: data.sfh,
            clmc: data.clmc,
            sqms: data.sqms,
            imgUrl: '',
            cldm: data.cldm,
            lbmc: data.lbmc
        }),
        addMaterialAttribute: (data) => post(process.env.API_HOST + '/addMaterialAttribute', {
            sfh: data.sfh,
            clmc: data.clmc,
            sqms: data.sqms,
            imgUrl: '',
            cldm: data.cldm,
            lbmc: data.lbmc
        })
    },
    qualitySet: {
        qualityList: (data) => get(process.env.API_HOST + '/qualityList', data), // 质量账单
        materialsList: (data) => get(process.env.API_HOST + '/materialsList', data), // 材料账单
        shujulist: (data) => get(process.env.API_HOST + '/shujulist', data), // 数据账单
        updateShuJuState: (data) => post(process.env.API_HOST + '/updateShuJuState', {
                sfh: data.sfh,
                uuid: data.uuid
            }) // 手动销账
    },
    systemSet: {
        quanixan: (data) => get(process.env.API_HOST + '/quanixan', data), //权限信息
        upquanxian: (data) => post(process.env.API_HOST + '/upquanxian', data), //修改权限
        test: (data) => get(process.env.API_HOST + '/el/xitongguanli/unit/query', data), //测试单位树
        addDocUnit: (data) => post(process.env.API_HOST + '/el/xitongguanli/unit/add', {
            addCode: data.addCode,
        }), // 加入立档单位
        delDocUnit: (data) => post(process.env.API_HOST + '/el/xitongguanli/unit/delete', {
            deleteCode: data.deleteCode,
        }), // 删除立档单位
        userList: (data) => get(process.env.API_HOST + '/UserList', data), // 用户列表
        childRoleList: (data) => get(process.env.API_HOST + '/zijueselist', data), // 子角色列表
        roleList: () => get(process.env.API_HOST + '/jueselist'), // 角色列表
        roleWhList: (data) => get(process.env.API_HOST + '/juesequanxianList', data), // 角色管理列表
        addRole: (data) => post(process.env.API_HOST + '/Addjuese', {
            jsmc: data.jsmc,
            jsms: data.jsms,
            fudaima: data.fudaima,
            addDate: data.addDate,
            sfh: data.sfh
        }), // 添加子角色
        deleteRole: (data) => post(process.env.API_HOST + '/deletejuese', {
            jsUUID: data.jsUUID,
            daima: data.daima
        }), // 编辑子角色
        resetPsd: (data) => post(process.env.API_HOST + '/UptUser', {
            // UUID: data.UUID,
            zt: data.zt,
            sfh: data.sfh,
            yhm: data.yhm,
            mima: data.mima,
            name: data.name,
            sjh: data.sjh,
            zj: data.zj,
            danwei: data.danwei,
            jgmcm: data.jgmcm,
            zhiwu: data.zhiwu,
            js: data.js,
            id: data.id
        }), // 重置密码
        selectuser: (data) => get(process.env.API_HOST + '/selectuser', data), // 用户条件查询
        addUser: (data) => post(process.env.API_HOST + '/AddUser', {
            sfh: data.sfh,
            yhm: data.yhm,
            mima: data.mima,
            name: data.name,
            zhiwu: data.zhiwu,
            sjh: data.sjh,
            zj: data.zj,
            danwei: data.danwei,
            jgmcm: data.jgmcm,
            addDate: data.addDate,
            juese: data.juese,
            jgmcm1: data.jgmcm1
        }), // 添加用户
        //人员来源类型列表
        userFormTypeList: () => get(process.env.API_HOST + '/humanSourceTypeList'),
        //删除人员来源类型
        deleteUserFormType: (data) => post(process.env.API_HOST + '/deleteHumanSourceType', {
            humanSourceType: data.humanSourceType
        }),
        //添加人员来源类型
        addUserFormType: (data) => post(process.env.API_HOST + '/addHumanSourceType', {
            humanSourceType: data.humanSourceType,
            code: data.code,
            addTime: data.addTime
        }),
        //左侧固定人员来源类型列表
        allDocDir: () => get(process.env.API_HOST + '/allDocDir'),
        //右侧根据人员代码获取来源类型
        docDirSettings: (data) => get(process.env.API_HOST + '/docDirSettings', {
            humanCode: data.humanCode
        }),
        //添加人员来源类型
        addDirSettings: (data) => post(process.env.API_HOST + '/addDirSettings', {
            dirList: data.dirList,
            humanSourceTypeCode: data.humanSourceTypeCode
        }),
        //删除人员来源类型
        deleteDirSettings: (data) => post(process.env.API_HOST + '/deleteDirSettings', {
            deleteList: data.deleteList,
            humanSourceTypeCode: data.humanSourceTypeCode
        }),
        //材料类别列表
        docTypeLibrary: () => get(process.env.API_HOST + '/docTypeLibrary'),
        //添加材料类别一级目录
        addFirst: (data) => post(process.env.API_HOST + '/addFirst', {
            showSerial: data.showSerial,
            docCode: data.docCode,
            docName: data.docName
        }),
        //添加材料类别三级目录
        addSecondDir: (data) => post(process.env.API_HOST + '/addSecondDir', {
            docName: data.docName,
            parentCode: data.parentCode
        }),
        //添加材料类别二级目录
        addDocName: (data) => post(process.env.API_HOST + '/addDocName', {
            parentCode: data.parentCode,
            docName: data.docName,
            binary: data.binary
        }),
        //删除材料类别一级和三级目录
        deleteDocType: (data) => post(process.env.API_HOST + '/deleteDocType', {
            deleteDocParent: data.deleteDocParent,
            deleteDocName: data.deleteDocName,
        }),
        //编辑材料类别一级和三级目录
        editDocName: (data) => post(process.env.API_HOST + '/editDocName', {
            docParent: data.docParent,
            docNameBefore: data.docNameBefore,
            docNameAfter: data.docNameAfter
        }),
        //基本属性列表
        basicAttributes: () => get(process.env.API_HOST + '/basicAttributes'),
        //删除基本属性
        deleteBasicAttributes: (data) => post(process.env.API_HOST + '/deleteBasicAttributes', {
            deleteKey: data.deleteKey
        }),
        //修改基本属性
        editBasicAttributes: (data) => post(process.env.API_HOST + '/editBasicAttributes', {
            nameBefore: data.nameBefore,
            nameAfter: data.nameAfter,
            typeAfter: data.typeAfter,
            defaultAfter: data.defaultAfter,
            isNesAfter: data.isNesAfter
        }),
        //添加基本属性
        addBasicAttributes: (data) => post(process.env.API_HOST + '/addBasicAttributes', {
            keyName: data.keyName,
            keyType: data.keyType,
            defaultValue: data.defaultValue,
            isNecessary: data.isNecessary
        }),
        //基本属性上移/下移
        moveUpBasicAttributes: (data) => post(process.env.API_HOST + '/moveUpBasicAttributes', {
            direction: data.direction,
            moveName: data.moveName
        }),
        //专有属性列表
        proprietaryAtt: (data) => post(process.env.API_HOST + '/proprietaryAtt', {
            parentCode: data.parentCode
        }),
        //基础属性字段默认值配置数据
        basicAttDefault: (data) => post(process.env.API_HOST + '/basicAttDefault/query', {
            docTypeCode: data.docTypeCode
        }),
        //基础属性字段默认值配置数据
        updateAttDefault: (data) => post(process.env.API_HOST + '/basicAttDefault/update', {
            docTypeCode: data.docTypeCode,
            jsonStr: data.jsonStr
        }),
        //添加专有属性
        proprietaryAdd: (data) => post(process.env.API_HOST + '/proprietary/add', {
            addName: data.addName,
            dataType: data.dataType,
            defaultValue: data.defaultValue,
            isNes: data.isNes,
            parentCode: data.parentCode
        }),
        //删除专有属性
        deleteProprietary: (data) => post(process.env.API_HOST + '/proprietary/delete', {
            attributeName: data.attributeName,
            parentCode: data.parentCode
        }),
        // 编辑专有属性
        updateProprietary: (data) => post(process.env.API_HOST + '/proprietary/update', {
            nameBefore: data.nameBefore,
            UUID: data.UUID,
            shujutype: data.shujutype,
            morenzhi: data.morenzhi,
            shifou: data.shifou
        }),
        //数据字典左侧数据表
        dataTableList: () => get(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataTable/query'),
        //自定义表左侧数据表
        dataTableList1: () => get(process.env.API_HOST + '/query1'),
        //添加数据表
        addDataTable: (data) => post(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataTable/add', {
            addName: data.addName
        }),
        //删除数据表
        deleteDataTable: (data) => post(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataTable/delete', {
            deleteName: data.deleteName
        }),
        //获取数据表的内容
        getTableItem: (data) => get(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataItem/query', data),
        //添加数据项
        addTableItem: (data) => post(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataItem/add', {
            tableName: data.tableName,
            name: data.name,
            code: data.code
        }),
        // 编辑数据项
        editData: (data) => post(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataItem/update', {
            tableName: data.tableName,
            codeBefore: data.codeBefore,
            codeAfter: data.codeAfter,
            nameBefore: data.nameBefore,
            nameAfter: data.nameAfter
        }),
        // 删除立档单位
        delCodeUnit: (data) => post(process.env.API_HOST + '/el/xitongguanli/unit/delete', {
            deleteCode: data.deleteCode
        }),
        //删除数据项
        deleteTableItem: (data) => post(process.env.API_HOST + '/el/xitongguanli/dataDictionary/dataItem/delete', {
            tableName: data.tableName,
            deleteName: data.deleteName
        }),
        //获取表结构信息
        getTableInfo: (data) => get(process.env.API_HOST + '/biaojiegou', data),
        //添加自定义字段
        addTableInfo: (data) => post(process.env.API_HOST + '/el/xitongguanli/datadictionary/tableDesign/add', {
            tableName: data.tableName,
            addColumnName: data.addColumnName,
            addType: data.addType,
            addSize: data.addSize,
            defaultValue: data.defaultValue,
            // nullAble: data.nullAble,
            comments: data.comments
        }),
        //统计分析
        queryDocState: (data) => get(process.env.API_HOST + '/el/statisticalAnalysis/queryDocState', data),
        queryDocUsage: (data) => get(process.env.API_HOST + '/el/statisticalAnalysis/queryDocUsage', data),
        queryTitle: (data) => get(process.env.API_HOST + '/el/statisticalAnalysis/queryTitle', data),
        queryzidian: (data) => post(process.env.API_HOST + '/el/xitongguanli/sqlInterface/query', {}),

        adddatabase: (data) => post(process.env.API_HOST + '/el/xitongguanli/sqlInterface/add', data),

        //删除自定义字段
        deleteTableInfo: (data) => post(process.env.API_HOST + '/el/xitongguanli/datadictionary/tableDesign/delete', {
            tableName: data.tableName,
            colName: data.colName
        }),
        //加载关联角色下拉列表
        loadRoleList: (data) => get(process.env.API_HOST + '/el/xitongguanli/userinfo/addUser/queryRoleList', data)
    },
    analysisfolder: {
        queryLog: (data) => get(process.env.API_HOST + '/el/statisticalAnalysis/queryDocLog', data), //
        systemLog: (data) => get(process.env.API_HOST + '/el/statisticalAnalysis/querySystemDocLog', data) //
    }
}
export default {
    install(Vue) {
        Vue.prototype.$api = api
    }
}

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index'
import Index from '@/pages/home/index'
import Service from '@/pages/service_application'
import Material from '@/pages/productive_material'
import Login from '@/pages/login'
import Application from '@/pages/my_application'
import Project from '@/pages/my_project'
import Approval from '@/pages/my_approval'
import ApprovalDetail from '@/pages/approval-detail'
import DocumentDetail from '@/pages/document-detail'
import ApplicationDetail from '@/pages/application-detail'
import FileLogDetail from '@/pages/filelog-detail'
import Backstage from '@/pages/backstage'
import TransferMaterial from '@/pages/backstage/transferMaterial'
import SystemManagement from '@/pages/backstage/system-management'
import DailyCare from '@/pages/backstage/dailyCare'
import Qualitycontrol from '@/pages/backstage/quality_control'
import Analysisfolder from '@/pages/backstage/analysisfolder'
import EditDocImg from '@/pages/EditDocImg'
// import Poolinfo from '@/pages/backstage/xinxiinfo/poolinfo'
// import Ement from '@/pages/backstage/management/ement'
Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                title: '首页'
            },
            children: [{
                    path: 'home',
                    name: 'Index',
                    component: Index,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: 'backstage',
                    name: 'Backstage',
                    component: Backstage,
                    meta: {
                        title: '后台'
                    },
                    children: [{
                            path: 'stage',
                            name: 'Stage',
                            component: () =>
                                import ('@/pages/backstage/build/stage'),
                            meta: {
                                title: '建立档案'
                            }
                        },
                        {
                            path: 'paper_info',
                            name: 'PaperInfo',
                            meta: {
                                title: '纸质档案信息'
                            },
                            component: () =>
                                import ('@/pages/backstage/build/paperInfo')
                        },
                        {
                            path: 'doc_info',
                            name: 'DocInfo',
                            meta: {
                                title: '电子档案信息'
                            },
                            component: () =>
                                import ('@/pages/backstage/build/docInfo')
                        },
                        {
                            path: 'quality_control',
                            name: 'quality_control',
                            meta: {
                                title: '质量管理'
                            },
                            redirect: '/home/backstage/quality_control/qualitybill',
                            component: Qualitycontrol,
                            children: [{
                                    path: 'qualitybill',
                                    name: 'qualitybill',
                                    meta: {
                                        title: '质量账单'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/quality_control/qualitybill.vue')
                                },
                                {
                                    path: 'archives',
                                    name: 'archives',
                                    meta: {
                                        title: '材料账单'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/quality_control/archives.vue')
                                },
                                {
                                    path: 'popup',
                                    name: 'popup',
                                    meta: {
                                        title: '审查档案质量弹框'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/quality_control/popup.vue')
                                },
                                {
                                    path: 'databill',
                                    name: 'databill',
                                    meta: {
                                        title: '数据账单'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/quality_control/databill.vue')
                                },
                                {
                                    path: 'reviewquality',
                                    name: 'reviewquality',
                                    meta: {
                                        title: '审查档案质量'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/quality_control/reviewquality.vue')
                                }
                            ]

                        },
                        {
                            path: 'analysisfolder',
                            name: 'analysisfolder',
                            meta: {
                                title: '统计分析'
                            },
                            component: Analysisfolder,
                            redirect: '/home/backstage/analysisfolder/statusfile',
                            children: [{
                                    path: 'statusfile',
                                    name: 'statusfile',
                                    meta: {
                                        title: '档案状态分析'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/analysisfolder/statusfile.vue')
                                },
                                {
                                    path: 'archives',
                                    name: 'archives',
                                    meta: {
                                        title: '档案状态分析'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/analysisfolder/archives.vue')
                                },
                                {
                                    path: 'databill',
                                    name: 'databill',
                                    meta: {
                                        title: '职务等级分析'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/analysisfolder/databill.vue')
                                },
                                {
                                    path: 'reviewquality',
                                    name: 'reviewquality',
                                    meta: {
                                        title: '档案维护审计分析'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/analysisfolder/reviewquality.vue')
                                },
                                {
                                    path: 'userauditanalysis',
                                    name: 'userauditanalysis',
                                    meta: {
                                        title: '用户行为审计分析'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/analysisfolder/userauditanalysis.vue')
                                }
                            ]

                        },
                      {
                        path: 'poolinfo',
                        name: 'Poolinfo',
                        meta: {
                          title: '系统消息'
                        },
                        component: () =>
                          import ('@/pages/backstage/xinxiinfo/poolinfo')
                      }, {
                        path: 'ement',
                        name: 'Ement',
                        meta: {
                          title: '库房管理'
                        },
                        component: () =>
                          import ('@/pages/backstage/management/ement')
                      },
                        {
                            path: 'input_information',
                            name: 'InputInfo',
                            meta: {
                                title: '录入电子档案信息'
                            },
                            component: () =>
                                import ('@/pages/backstage/build/inputInfo')
                        },
                        {
                            path: 'scan_material',
                            name: 'ScanMaterial',
                            meta: {
                                title: '扫描材料'
                            },
                            component: () =>
                                import ('@/pages/backstage/build/scanMaterial')
                        },
                        {
                            path: 'image_opt',
                            name: 'ImageOpt',
                            meta: {
                                title: '图像优化'
                            },
                            component: () =>
                                import ('@/pages/backstage/build/imageOpt')
                        },
                        {
                            path: 'transfer_material',
                            name: 'Transfer_material',
                            meta: {
                                title: '转接材料'
                            },
                            redirect: '/home/backstage/transfer_material/type/1',
                            component: TransferMaterial,
                            children: [{
                                path: 'type/:typeId',
                                name: 'MaterialType',
                                meta: {
                                    title: '转接材料'
                                },
                                component: () =>
                                    import ('@/pages/backstage/transferMaterial/content')
                            }]
                        },
                        {
                            path: 'dailyCare',
                            name: 'dailyCare',
                            meta: {
                                title: '日常维护'
                            },
                            redirect: '/home/backstage/dailyCare/archives',
                            component: DailyCare,
                            children: [{
                                    path: 'archives',
                                    name: 'archives',
                                    meta: {
                                        title: '档案维护'
                                    },
                                    component: () => import ('@/pages/backstage/dailyCare/archives.vue')
                                },
                                {
                                    path: 'attrition',
                                    name: 'attrition',
                                    meta: {
                                        title: '减员副本'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/dailyCare/attrition.vue')
                                },
                                {
                                    path: 'paperInfo',
                                    name: 'paperInfo',
                                    meta: {
                                        title: '纸质档案信息'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/dailyCare/paperInfo.vue')
                                }
                            ]
                        },
                        {
                            path: 'docInfo',
                            name: 'docInfo',
                            meta: {
                                title: '电子档案信息'
                            },
                            component: () =>
                                import ('@/pages/backstage/dailyCare/docInfo.vue')
                        },
                        {
                            path: 'acceptList',
                            name: 'AcceptList',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollIn/acceptList'),
                            meta: {
                                title: '接收列表'
                            }
                        },
                        {
                            path: 'transferList',
                            name: 'TransferList',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollIn/transferList'),
                            meta: {
                                title: '转递列表'
                            }
                        },
                        {
                            path: 'transfer_detail',
                            name: 'TransferDeatil',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollIn/transferDetail'),
                            meta: {
                                title: '转递材料详情'
                            }
                        },
                        {
                            path: 'accept_detail',
                            name: 'AcceptrDeatil',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollIn/acceptDetail'),
                            meta: {
                                title: '接收材料详情'
                            }
                        },
                        {
                            path: 'rollList',
                            name: 'RollList',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollOut/rollOutList'),
                            meta: {
                                title: '转出列表'
                            }
                        },
                        {
                            path: 'roll_detail',
                            name: 'RollDeatil',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollOut/rollOutDetail'),
                            meta: {
                                title: '转出材料详情'
                            }
                        },
                        {
                            path: 'scan',
                            name: 'Scan',
                            component: () =>
                                import ('@/pages/backstage/transferMaterial/content/rollIn/scan'),
                            meta: {
                                title: '扫描材料'
                            }
                        },
                        {
                            path: 'transfer_doc',
                            name: 'TransferDoc',
                            component: () =>
                                import ('@/pages/backstage/transferDoc'),
                            meta: {
                                title: '转接档案'
                            }
                        },
                        {
                            path: 'rollOut_list',
                            name: 'RollList',
                            component: () =>
                                import ('@/pages/backstage/transferDoc/rollOut/rollList'),
                            meta: {
                                title: '转出档案列表'
                            }
                        },
                        {
                            path: 'rollOut_detail',
                            name: 'rollDetail',
                            component: () =>
                                import ('@/pages/backstage/transferDoc/rollOut/rollDetail'),
                            meta: {
                                title: '转出档案详情'
                            }
                        },
                        {
                            path: 'rollIn_list',
                            name: 'RollInList',
                            component: () =>
                                import ('@/pages/backstage/transferDoc/rollIn/rollInList'),
                            meta: {
                                title: '接收档案列表'
                            }
                        },
                        {
                            path: 'rollIn_detail',
                            name: 'rollInDetail',
                            component: () =>
                                import ('@/pages/backstage/transferDoc/rollIn/rollInDetail'),
                            meta: {
                                title: '接收档案详情'
                            }
                        },
                        {
                            path: 'system-management',
                            name: 'SystemManagement',
                            component: SystemManagement,
                            meta: {
                                title: '系统管理'
                            },
                            redirect: '/home/backstage/system-management/unit',
                            children: [{
                                    path: 'unit',
                                    name: 'Unit',
                                    meta: {
                                        title: '单位'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/unit.vue')
                                },
                                {
                                    path: 'user',
                                    name: 'User',
                                    meta: {
                                        title: '用户'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/user.vue')
                                },
                                {
                                    path: 'role',
                                    name: 'Role',
                                    meta: {
                                        title: '角色'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/role.vue')
                                },
                                {
                                    path: 'limit',
                                    name: 'Limit',
                                    meta: {
                                        title: '权限维护'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/limit.vue')
                                },
                                {
                                    path: 'dirTemplate',
                                    name: 'dirTemplate',
                                    meta: {
                                        title: '目录模板'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/dirTemplate.vue')
                                },
                                {
                                    path: 'materialType',
                                    name: 'materialType',
                                    meta: {
                                        title: '材料类别'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/materialType.vue')
                                },
                                {
                                    path: 'dictionary',
                                    name: 'dictionary',
                                    meta: {
                                        title: '数据字典'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/dictionary.vue')
                                },
                                {
                                    path: 'customTable',
                                    name: 'customTable',
                                    meta: {
                                        title: '自定义表'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/customTable.vue')
                                },
                                {
                                    path: 'database',
                                    name: 'database',
                                    meta: {
                                        title: '数据库接口'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/database.vue')
                                },
                                {
                                    path: 'micro_service',
                                    name: 'microService',
                                    meta: {
                                        title: '微服务接口'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/microService.vue')
                                },
                                {
                                    path: 'backup',
                                    name: 'backup',
                                    meta: {
                                        title: '数据备份'
                                    },
                                    component: () =>
                                        import ('@/pages/backstage/system-management/backup.vue')
                                }
                            ]
                        },
                        {
                            path: 'addUser',
                            name: 'AddUser',
                            meta: {
                                title: '添加用户'
                            },
                            component: () =>
                                import ('@/pages/backstage/system-management/addUser.vue')
                        }
                    ]
                },
                {
                    path: 'service',
                    name: 'Service',
                    component: Service,
                    meta: {
                        title: '服务申请'
                    },
                    children: [{
                            path: 'scan_files',
                            name: 'ScanFiles',
                            component: () =>
                                import ('../pages/service_application/scanFiles.vue'),
                            meta: {
                                title: '查阅扫描档案'
                            }
                        },
                        {
                            path: 'paper_archives',
                            name: 'Archives',
                            component: () =>
                                import ('../pages/service_application/archives.vue'),
                            meta: {
                                title: '查阅纸质档案'
                            }
                        },
                        {
                            path: 'borrow_paper_files',
                            name: 'BorrowArchives',
                            component: () =>
                                import ('../pages/service_application/borrowArchives.vue'),
                            meta: {
                                title: '借阅纸质档案'
                            }
                        },
                        {
                            path: 'log_file',
                            name: 'FileLog',
                            component: () =>
                                import ('../pages/service_application/fileLog.vue'),
                            meta: {
                                title: '查看档案日志'
                            }
                        }
                    ]
                },
                {
                    path: 'material',
                    name: 'Material',
                    component: Material,
                    meta: {
                        title: '生产材料'
                    },
                    children: [{
                            path: 'appoint',
                            name: 'Appoint',
                            component: () =>
                                import ('../pages/productive_material/appoint.vue'),
                            meta: {
                                title: '任免表'
                            }
                        },
                        {
                            path: 'reward',
                            name: 'Reward',
                            component: () =>
                                import ('../pages/productive_material/reward.vue'),
                            meta: {
                                title: '奖励表'
                            }
                        },
                        {
                            path: 'dispose',
                            name: 'Dispose',
                            component: () =>
                                import ('../pages/productive_material/dispose.vue'),
                            meta: {
                                title: '处分表'
                            }
                        },
                        {
                            path: 'retirement',
                            name: 'Retirement',
                            component: () =>
                                import ('../pages/productive_material/retirement.vue'),
                            meta: {
                                title: '离退休'
                            }
                        }
                    ]
                },
                {
                    path: 'project',
                    name: 'Project',
                    component: Project,
                    meta: {
                        title: '我的方案'
                    }
                },
                {
                    path: 'application',
                    name: 'Application',
                    component: Application,
                    meta: {
                        title: '我的申请'
                    }
                },
                {
                    path: 'approval',
                    name: 'Approval',
                    component: Approval,
                    meta: {
                        title: '我的审批'
                    }
                },
                {
                    path: 'approval_detail',
                    name: 'ApprovalDetail',
                    component: ApprovalDetail,
                    meta: {
                        title: '审批详情'
                    }
                },
                {
                    path: 'document_detail',
                    name: 'DocumentDetail',
                    component: DocumentDetail,
                    meta: {
                        title: '档案详情'
                    }
                },
                {
                    path: 'edit_doc_img',
                    name: 'EditDocImg',
                    component: EditDocImg,
                    meta: {
                        title: '档案预览'
                    }
                },
                {
                    path: 'application_detail',
                    name: 'ApplicationDetail',
                    component: ApplicationDetail,
                    meta: {
                        title: '申请详情'
                    }
                },
                {
                    path: 'filelog_detail',
                    name: 'FileLogDetail',
                    component: FileLogDetail,
                    meta: {
                        title: '查看日志'
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        // console.log(document.cookie.indexOf())
        if (document.cookie.indexOf('userinfo') !== -1) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    }
})

router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router

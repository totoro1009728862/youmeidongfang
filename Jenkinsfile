pipeline {
    agent any
    parameters {
        string(name:'VERSION',defaultValue:'XXX',description:'发布时候集测不用填，预发生产环境需要填入需要发布的镜像版本号；回滚时候都需要填')
        choice(name:'DEPLOY_TYPE_CHOICE',choices:'Deploy\nRollBack',description:'发布还是回滚')
        choice(name:'DEPLOY_ENV_CHOICE',choices:'集测\n预发\n生产',description:'发布的环境')
        string(name:'IMAGE_VARIABLE',defaultValue:'hxtrip-touch',description:'不用修改的镜像变量')
        string(name:'RELEASE_POD_VARIABLE',defaultValue:'hxtrip-touch-web',description:'不用修改的集测部署变量')
        string(name:'RC_POD_VARIABLE',defaultValue:'hxtrip-touch-web',description:'不用修改的预发部署变量')
        string(name:'PROD_POD_VARIABLE',defaultValue:'hxtrip-touch-web',description:'不用修改的生产部署变量')
    }

    stages {

        //1 克隆源码(多分支流水线项目会直接拉取分支代码可以不写)
        stage('Git'){
            when {
                expression {return params.DEPLOY_ENV_CHOICE == '集测' && params.DEPLOY_TYPE_CHOICE == 'Deploy' }
            }
            steps{
                git branch: 'release', credentialsId: 'git-account', url: 'http://code.hxtrip.com/gitlab/zdgroup/zdweb/hxtrip-touch-web.git'
            }
        }


        //2打包(集测环境)
        stage('Docker Build Push release') {
            when {
                expression {return params.DEPLOY_ENV_CHOICE == '集测' && params.DEPLOY_TYPE_CHOICE == 'Deploy' }
            }
            steps {
                withCredentials([usernamePassword(credentialsId:'dockerhub-account',usernameVariable:'username',passwordVariable:'passwd')]){
                    sh "docker login --username=${username} --password=${passwd}  registry.cn-shanghai.aliyuncs.com"
                    sh "docker build -t registry-vpc.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}$BUILD_NUMBER -f Dockerfile ."
                    sh "docker push registry-vpc.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}$BUILD_NUMBER "
                }
            }

        }
        //3部署
        stage('Deploy to Kubernetes') {
            parallel {
                // 集测环境
                stage('K8s Demploy release') {
                    when {
                        expression {return params.DEPLOY_ENV_CHOICE == '集测' && params.DEPLOY_TYPE_CHOICE == 'Deploy' }
                    }
                    steps {
                        sh "kubectl config use-context kubernetes-test"
                        sh "kubectl set image deployment/${params.RELEASE_POD_VARIABLE} ${params.RELEASE_POD_VARIABLE}=registry.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}$BUILD_NUMBER"

                    }

                }
                stage('K8s Demploy rc') {
                    when {
                        expression {return params.DEPLOY_ENV_CHOICE == '预发' && params.DEPLOY_TYPE_CHOICE == 'Deploy'  &&  params.VERSION != 'XXX' }
                    }
                    steps {
                        sh "kubectl config use-context kubernetes-serverless-context"
                        sh "kubectl set image deployment/${params.RC_POD_VARIABLE} ${params.RC_POD_VARIABLE}=registry.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}${params.VERSION}"
                    }

                }
                stage('K8s Demploy master') {
                    when {
                        expression {return params.DEPLOY_ENV_CHOICE == '生产' && params.DEPLOY_TYPE_CHOICE == 'Deploy' &&  params.VERSION != 'XXX' }
                    }
                    steps {
                        sh "kubectl config use-context kubernetes-admin-cc3da6efbd97e44c3978506cfad59e709"
                        sh "kubectl set image deployment/${params.PROD_POD_VARIABLE} ${params.PROD_POD_VARIABLE}=registry.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}${params.VERSION}"
                    }

                }
            }
        }

        //4回滚
        stage('RollBack to Kubernetes') {
            parallel {
                // 集测环境
                stage('K8s RollBack release') {
                    when {
                        expression {return params.DEPLOY_ENV_CHOICE == '集测' && params.DEPLOY_TYPE_CHOICE == 'RollBack' &&  params.VERSION != 'XXX' }
                    }
                    steps {
                        sh "kubectl config use-context kubernetes-test"
                        sh "kubectl set image deployment/${params.RELEASE_POD_VARIABLE} ${params.RELEASE_POD_VARIABLE}=registry.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}${params.VERSION}"

                    }

                }
                stage('K8s RollBack rc') {
                    when {
                        expression {return params.DEPLOY_ENV_CHOICE == '预发' && params.DEPLOY_TYPE_CHOICE == 'RollBack'  &&  params.VERSION != 'XXX' }
                    }
                    steps {
                        sh "kubectl config use-context kubernetes-serverless-context"
                        sh "kubectl set image deployment/${params.RC_POD_VARIABLE} ${params.RC_POD_VARIABLE}=registry.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}${params.VERSION}"
                    }

                }
                stage('K8s RollBack master') {
                    when {
                        expression {return params.DEPLOY_ENV_CHOICE == '生产' && params.DEPLOY_TYPE_CHOICE == 'RollBack' &&  params.VERSION != 'XXX' }
                    }
                    steps {
                        sh "kubectl config use-context kubernetes-admin-cc3da6efbd97e44c3978506cfad59e709"
                        sh "kubectl set image deployment/${params.PROD_POD_VARIABLE} ${params.PROD_POD_VARIABLE}=registry.cn-shanghai.aliyuncs.com/zdly/zdly_code_public:${params.IMAGE_VARIABLE}${params.VERSION}"
                    }

                }
            }
        }



    }

    post {
        failure {
            emailext (
                subject: "构建失败: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: '''<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4" offset="0">
                                            <table width="95%" cellpadding="0" cellspacing="0"  style="font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif">
                                                <tr>
                                                    <td>
                                                        <b><font color="#0B610B">构建信息</font></b>
                                                        <hr size="2" width="100%" align="center" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ul>
                                                            <li>项目名称: ${PROJECT_NAME}</li>
                                                            <li>构建编号: # ${BUILD_NUMBER}</li>
                                                            <li>触发原因: ${CAUSE}</li>
                                                            <li>构建状态: ${BUILD_STATUS}</li>
                                                            <li>构建日志: <a href="${BUILD_URL}console">${BUILD_URL}console</a></li>
                                                            <li>构建Url: <a href="${BUILD_URL}">${BUILD_URL}</a></li>
                                                            <li>项目Url: <a href="${PROJECT_URL}">${PROJECT_URL}</a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </table>
                                            <h4><font color="#0B610B">最近提交</font></h4>
                                            <hr size="2" width="100%" />
                                            <ul>${CHANGES_SINCE_LAST_SUCCESS, reverse=true, format="%c", changesFormat="<li>%d [%a] %m</li>"}</ul>
                                            详细提交: <a href="${PROJECT_URL}changes">${PROJECT_URL}changes</a><br/>
                                       </body>''',
                to: "project@hxtrip.com",
                from: "admin@hxtrip.com"
            )
        }
    }

}

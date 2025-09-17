// 加载env配置
export function warppEnv(envConf: Recordable): viteEnv {
    const ret: any = {}
    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n')
        realName = realName === 'true' ? true : realName === 'false' ? false : realName
        if (envName === 'VITE_PROT') {
            realName = Number(realName)
        }
        if (envName === 'VITE_PROXY') {
            try {
                realName = JSON.parse(realName)
            } catch (error) {
                console.log(error)
            }
        }
        ret[envName] = realName
        process.env[envName] = realName
    }
    return ret
}
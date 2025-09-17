export const formConfig: FormConfigItem[] = [
    {
        name: 'name',
        label: '姓名',
        type: 'input',
        placeholder: '请输入姓名',
    },
    {
        name: 'position',
        label: '岗位',
        type: 'input',
        placeholder: '请输入岗位',
    },
    {
        name: 'gender',
        label: '性别',
        type: 'select',
        placeholder: '请选择性别',
        options: [
            {
                value: 'male',
                label: '男',
            },
            {
                value: 'female',
                label: '女',
            },
        ],
    },
]
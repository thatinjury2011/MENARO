// 对应 src/components/shared/QuoteForm.astro
//
// field 是 Formspree 收到的字段名（会出现在通知邮件里），label 是页面显示文案。
// 两者刻意分开：Formspree 后台/邮件模板认的是 field，改文案时不要动它。
// 之前每个字段的 field 名都手写了 2 遍（name 属性 + data-fs-error），现在只写一次。

export const formspree = {
  /** Formspree 表单 ID */
  id: "xyekjojw",
  /** JS 失效时的原生 POST 降级地址 */
  endpoint: "https://formspree.io/f/xyekjojw",
};

export const quoteForm = {
  zh: {
    /** 邮件标题（Formspree 的 _subject 字段） */
    subject: "MENARO 官网新询盘",
    /** 表单语言（Formspree 的 _language 字段） */
    language: "zh",
    fields: {
      name: { field: "姓名", label: "您的姓名", error: "请填写您的姓名" },
      email: { field: "邮箱", label: "邮箱", error: "请填写正确的邮箱地址" },
      phone: { field: "电话", label: "电话", error: "电话格式不正确" },
      company: {
        field: "公司名称",
        label: "公司名称",
        error: "公司名称格式不正确",
      },
      region: {
        field: "国家/地区",
        label: "国家/地区",
        error: "请选择国家/地区",
        placeholder: "请选择",
      },
      message: {
        field: "项目需求",
        label: "项目需求",
        error: "项目需求格式不正确",
      },
    },
    regions: ["中国", "意大利", "其他欧洲国家", "北美", "中东", "东南亚", "其他"],
    submit: "提交表单",
    success: "提交成功，我们会尽快与您联系。",
    error: "提交失败，请稍后重试，或通过页面下方的方式直接联系我们。",
    note: "提交即表示您同意我们的隐私政策，我们不会分享您的信息",
    privacyLink: "隐私政策",
  },
};

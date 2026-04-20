import { useState } from "react";

const initialStatistics = [
  {
    department: "الكيمياء الحيوية",
    period: "2026-04",
    tests: 4820,
    turnaround: 97,
  },
  {
    department: "أمراض الدم",
    period: "2026-04",
    tests: 2910,
    turnaround: 94,
  },
  {
    department: "الأحياء الدقيقة",
    period: "2026-04",
    tests: 2140,
    turnaround: 92,
  },
  {
    department: "بنك الدم",
    period: "2026-04",
    tests: 2600,
    turnaround: 96,
  },
];

const initialInventory = [
  {
    name: "HbA1c Reagent Kit",
    department: "الكيمياء الحيوية",
    quantity: 6,
    minimum: 10,
  },
  {
    name: "Blood Culture Bottles",
    department: "الأحياء الدقيقة",
    quantity: 22,
    minimum: 12,
  },
  {
    name: "ESR Tubes",
    department: "أمراض الدم",
    quantity: 8,
    minimum: 8,
  },
  {
    name: "ANA Control Serum",
    department: "المناعة",
    quantity: 4,
    minimum: 7,
  },
];

const documents = [
  {
    title: "سياسة السلامة الحيوية",
    category: "سياسات",
    status: "معتمد",
    updatedAt: "20 أبريل 2026",
  },
  {
    title: "دليل تشغيل أجهزة الكيمياء",
    category: "أدلة تشغيل",
    status: "محدّث",
    updatedAt: "17 أبريل 2026",
  },
  {
    title: "نموذج متابعة درجات الحرارة",
    category: "نماذج",
    status: "معتمد",
    updatedAt: "11 أبريل 2026",
  },
  {
    title: "سياسة التعامل مع النتائج الحرجة",
    category: "سياسات",
    status: "قيد المراجعة",
    updatedAt: "08 أبريل 2026",
  },
  {
    title: "سجل استلام المحاليل",
    category: "سجلات",
    status: "معتمد",
    updatedAt: "03 أبريل 2026",
  },
  {
    title: "دليل ضبط الجودة الداخلي",
    category: "أدلة جودة",
    status: "محدّث",
    updatedAt: "28 مارس 2026",
  },
];

const tabs = [
  { id: "statistics", label: "إحصائيات الأقسام" },
  { id: "inventory", label: "جرد المحاليل" },
  { id: "documents", label: "السياسات والمستندات" },
];

const statsDepartments = [
  "الكيمياء الحيوية",
  "أمراض الدم",
  "الأحياء الدقيقة",
  "بنك الدم",
  "الهرمونات",
];

const inventoryDepartments = [
  "الكيمياء الحيوية",
  "الأحياء الدقيقة",
  "أمراض الدم",
  "المناعة",
];

const defaultStatsForm = {
  department: "",
  period: "",
  tests: "",
  turnaround: "",
};

const defaultInventoryForm = {
  itemName: "",
  itemDepartment: "",
  quantity: "",
  minimum: "",
};

function formatMonth(monthValue) {
  const [year, month] = monthValue.split("-");
  return `${month}/${year}`;
}

function App() {
  const [activeSection, setActiveSection] = useState("statistics");
  const [statistics, setStatistics] = useState(initialStatistics);
  const [inventory, setInventory] = useState(initialInventory);
  const [statsForm, setStatsForm] = useState(defaultStatsForm);
  const [inventoryForm, setInventoryForm] = useState(defaultInventoryForm);

  const totalTests = statistics.reduce((sum, item) => sum + item.tests, 0);
  const avgTurnaround = Math.round(
    statistics.reduce((sum, item) => sum + item.turnaround, 0) /
      statistics.length,
  );
  const activeDepartments = new Set(statistics.map((item) => item.department))
    .size;
  const lowItemsCount = inventory.filter(
    (item) => item.quantity <= item.minimum,
  ).length;

  function handleStatsSubmit(event) {
    event.preventDefault();

    setStatistics((current) => [
      {
        department: statsForm.department,
        period: statsForm.period,
        tests: Number(statsForm.tests),
        turnaround: Number(statsForm.turnaround),
      },
      ...current,
    ]);

    setStatsForm(defaultStatsForm);
  }

  function handleInventorySubmit(event) {
    event.preventDefault();

    setInventory((current) => [
      {
        name: inventoryForm.itemName,
        department: inventoryForm.itemDepartment,
        quantity: Number(inventoryForm.quantity),
        minimum: Number(inventoryForm.minimum),
      },
      ...current,
    ]);

    setInventoryForm(defaultInventoryForm);
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero__copy">
          <span className="eyebrow">البوابة الداخلية للمستشفى</span>
          <h1>بوابة المختبر المركزية</h1>
          <p>
            مساحة موحدة لإدارة مؤشرات الأداء، متابعة جرد المحاليل والمواد،
            والرجوع السريع إلى السياسات والمستندات التشغيلية.
          </p>
          <div className="hero__actions">
            <button
              className="primary-btn"
              type="button"
              onClick={() => setActiveSection("statistics")}
            >
              فتح الإحصائيات
            </button>
            <button
              className="secondary-btn"
              type="button"
              onClick={() => setActiveSection("inventory")}
            >
              فتح الجرد
            </button>
          </div>
        </div>

        <div className="hero__panel">
          <div className="status-card">
            <span>ملخص اليوم</span>
            <strong>3 وحدات أساسية</strong>
            <p>إدارة مركزية تقلل التشتت وتوحّد العمل داخل أقسام المختبر.</p>
          </div>
          <div className="status-grid">
            <article>
              <span>أقسام مفعلة</span>
              <strong>6</strong>
            </article>
            <article>
              <span>مواد منخفضة</span>
              <strong>{lowItemsCount}</strong>
            </article>
            <article>
              <span>مستندات معتمدة</span>
              <strong>18</strong>
            </article>
          </div>
        </div>
      </header>

      <main>
        <section className="overview">
          <article className="overview-card">
            <h2>كيف صممنا البوابة؟</h2>
            <p>
              صفحة رئيسية واحدة تعطي دخولًا سريعًا، مع وحدات مستقلة داخل نفس
              التجربة لتسهيل التوسع وإدارة الصلاحيات مستقبلاً.
            </p>
          </article>
          <article className="overview-card accent">
            <h2>الهيكل المقترح</h2>
            <p>
              لوحة تحكم عامة، ثم وحدات فرعية لكل وظيفة مع نماذج إدخال وواجهة
              متابعة ومرجع موحد للمستندات.
            </p>
          </article>
        </section>

        <nav className="section-tabs" aria-label="وحدات البوابة">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${
                activeSection === tab.id ? "active" : ""
              }`}
              type="button"
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeSection === "statistics" && (
          <section className="content-section active">
            <div className="section-heading">
              <div>
                <span className="section-label">الوحدة الأولى</span>
                <h2>إدخال ومتابعة إحصائيات أقسام المختبر</h2>
              </div>
              <p>
                نموذج مبدئي لتسجيل الإنجاز الشهري ومتابعة أحجام العمل لكل قسم.
              </p>
            </div>

            <div className="two-column">
              <form className="panel form-panel" onSubmit={handleStatsSubmit}>
                <h3>إضافة إحصائية</h3>
                <label>
                  اسم القسم
                  <select
                    name="department"
                    value={statsForm.department}
                    onChange={(event) =>
                      setStatsForm((current) => ({
                        ...current,
                        department: event.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">اختر القسم</option>
                    {statsDepartments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  الفترة
                  <input
                    type="month"
                    name="period"
                    value={statsForm.period}
                    onChange={(event) =>
                      setStatsForm((current) => ({
                        ...current,
                        period: event.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <label>
                  عدد الفحوصات
                  <input
                    type="number"
                    name="tests"
                    min="0"
                    value={statsForm.tests}
                    onChange={(event) =>
                      setStatsForm((current) => ({
                        ...current,
                        tests: event.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <label>
                  نسبة الإنجاز
                  <input
                    type="number"
                    name="turnaround"
                    min="0"
                    max="100"
                    placeholder="مثال: 96"
                    value={statsForm.turnaround}
                    onChange={(event) =>
                      setStatsForm((current) => ({
                        ...current,
                        turnaround: event.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <button type="submit" className="primary-btn full-width">
                  حفظ الإحصائية
                </button>
              </form>

              <div className="panel">
                <div className="panel__title">
                  <h3>ملخص سريع</h3>
                  <span>آخر الإدخالات</span>
                </div>
                <div className="metric-cards">
                  <article>
                    <span>إجمالي الفحوصات</span>
                    <strong>{totalTests.toLocaleString("en-US")}</strong>
                  </article>
                  <article>
                    <span>متوسط الإنجاز</span>
                    <strong>{avgTurnaround}%</strong>
                  </article>
                  <article>
                    <span>الأقسام النشطة</span>
                    <strong>{activeDepartments}</strong>
                  </article>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>القسم</th>
                        <th>الفترة</th>
                        <th>الفحوصات</th>
                        <th>الإنجاز</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statistics.map((entry) => (
                        <tr key={`${entry.department}-${entry.period}-${entry.tests}`}>
                          <td>{entry.department}</td>
                          <td>{formatMonth(entry.period)}</td>
                          <td>{entry.tests.toLocaleString("en-US")}</td>
                          <td>{entry.turnaround}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "inventory" && (
          <section className="content-section active">
            <div className="section-heading">
              <div>
                <span className="section-label">الوحدة الثانية</span>
                <h2>جرد المحاليل والمواد المخبرية</h2>
              </div>
              <p>
                متابعة الكميات الحالية، الحدود الدنيا، وتحديد المواد التي تحتاج
                إلى إعادة طلب.
              </p>
            </div>

            <div className="two-column">
              <form
                className="panel form-panel"
                onSubmit={handleInventorySubmit}
              >
                <h3>إضافة مادة جديدة</h3>
                <label>
                  اسم المادة
                  <input
                    type="text"
                    name="itemName"
                    value={inventoryForm.itemName}
                    onChange={(event) =>
                      setInventoryForm((current) => ({
                        ...current,
                        itemName: event.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <label>
                  القسم
                  <select
                    name="itemDepartment"
                    value={inventoryForm.itemDepartment}
                    onChange={(event) =>
                      setInventoryForm((current) => ({
                        ...current,
                        itemDepartment: event.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">اختر القسم</option>
                    {inventoryDepartments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  الكمية الحالية
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    value={inventoryForm.quantity}
                    onChange={(event) =>
                      setInventoryForm((current) => ({
                        ...current,
                        quantity: event.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <label>
                  الحد الأدنى
                  <input
                    type="number"
                    name="minimum"
                    min="0"
                    value={inventoryForm.minimum}
                    onChange={(event) =>
                      setInventoryForm((current) => ({
                        ...current,
                        minimum: event.target.value,
                      }))
                    }
                    required
                  />
                </label>
                <button type="submit" className="primary-btn full-width">
                  إضافة للجرد
                </button>
              </form>

              <div className="panel">
                <div className="panel__title">
                  <h3>حالة المخزون</h3>
                  <span>تنبيه آلي للمواد المنخفضة</span>
                </div>
                <div className="inventory-list">
                  {inventory.map((item) => {
                    const lowStock = item.quantity <= item.minimum;

                    return (
                      <article className="inventory-item" key={`${item.name}-${item.department}`}>
                        <div>
                          <h4>{item.name}</h4>
                          <div className="inventory-meta">
                            {item.department} • الكمية الحالية: {item.quantity} •
                            الحد الأدنى: {item.minimum}
                          </div>
                        </div>
                        <div className={`badge ${lowStock ? "warning" : "success"}`}>
                          {lowStock ? "يحتاج إعادة طلب" : "متوفر"}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "documents" && (
          <section className="content-section active">
            <div className="section-heading">
              <div>
                <span className="section-label">الوحدة الثالثة</span>
                <h2>سياسات ومستندات المختبر</h2>
              </div>
              <p>
                أرشفة منظمة للسياسات والنماذج والأدلة التشغيلية مع تصنيف حسب
                النوع والحالة.
              </p>
            </div>

            <div className="panel documents-panel">
              <div className="panel__title">
                <h3>مكتبة المستندات</h3>
                <span>نسخة أولية قابلة للربط لاحقًا مع نظام رفع ملفات</span>
              </div>
              <div className="document-grid">
                {documents.map((documentItem) => (
                  <article className="document-card" key={documentItem.title}>
                    <span>{documentItem.category}</span>
                    <h4>{documentItem.title}</h4>
                    <div className="document-meta">
                      آخر تحديث: {documentItem.updatedAt}
                    </div>
                    <div
                      className={`badge ${
                        documentItem.status === "قيد المراجعة"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {documentItem.status}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

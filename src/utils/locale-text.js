export const localeText = {
  noRowsLabel: "Nincs elérhető adat",
  errorOverlayDefaultLabel: "Hiba történt.",

  toolbarDensity: "Sűrűség",
  toolbarDensityLabel: "Sűrűség",
  toolbarDensityCompact: "Kompakt",
  toolbarDensityStandard: "Normál",
  toolbarDensityComfortable: "Kényelmes",

  toolbarColumns: "Oszlopok",
  toolbarColumnsLabel: "Oszlopok kiválasztása",

  toolbarFilters: "Szűrők",
  toolbarFiltersLabel: "Szűrők megjelenítése",
  toolbarFiltersTooltipHide: "Szűrők elrejtése",
  toolbarFiltersTooltipShow: "Szűrők megjelenítése",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktív szűrők` : `${count} aktív szűrő`,

  toolbarExport: "Export",
  toolbarExportLabel: "Export",
  toolbarExportCSV: "Letöltés CSV-ként",
  toolbarExportPrint: "Nyomtatás",

  columnsPanelTextFieldLabel: "Oszlop keresése",
  columnsPanelTextFieldPlaceholder: "Oszlop címke",
  columnsPanelDragIconLabel: "Oszlop átrendezése",
  columnsPanelShowAllButton: "Összes megjelenítése",
  columnsPanelHideAllButton: "Összes elrejtése",
  columnsPanelResetButton: "Alaphelyzetbe állítás",

  filterPanelAddFilter: "Szűrő hozzáadása",
  filterPanelDeleteIconLabel: "Törlés",
  filterPanelLinkOperator: "Logikai operátor",
  filterPanelOperators: "Operátorok",
  filterPanelOperatorAnd: "És",
  filterPanelOperatorOr: "Vagy",
  filterPanelColumns: "Oszlopok",
  filterPanelInputLabel: "Érték",
  filterPanelInputPlaceholder: "Szűrő érték",

  columnMenuLabel: "Menü",
  columnMenuShowColumns: "Oszlopok megjelenítése",
  columnMenuFilter: "Szűrés",
  columnMenuHideColumn: "Oszlop elrejtése",
  columnMenuUnsort: "Rendezés törlése",
  columnMenuSortAsc: "Növekvő sorrend",
  columnMenuSortDesc: "Csökkenő sorrend",
  columnMenuManageColumns: "Oszlopok kezelése",

  filterOperatorContains: "Tartalmazza",
  filterOperatorDoesNotContain: "Nem tartalmazza",
  filterOperatorEquals: "Egyenlő",
  filterOperatorDoesNotEqual: "Nem egyenlő",
  filterOperatorStartsWith: "Ezzel kezdődik",
  filterOperatorEndsWith: "Ezzel végződik",
  filterOperatorIs: "Ez",
  filterOperatorNot: "Nem",
  filterOperatorAfter: "Utána",
  filterOperatorOnOrAfter: "Ekkor vagy utána",
  filterOperatorBefore: "Előtte",
  filterOperatorOnOrBefore: "Ekkor vagy előtte",
  filterOperatorIsEmpty: "Üres",
  filterOperatorIsNotEmpty: "Nem üres",
  filterOperatorIsAnyOf: "Bármelyik",

  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} sor kiválasztva`
      : `${count.toLocaleString()} sor kiválasztva`,
  footerTotalRows: "Összes sor:",
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
  footerPaginationRowsPerPage: "Sorok oldalanként:",
  footerPaginationOf: " / ",

  MuiTablePagination: {
    labelRowsPerPage: "Sorok oldalanként:",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} / ${count !== -1 ? count : `több mint ${to}`}`,
  },
};

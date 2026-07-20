import { useEffect, useState } from "react";
import contentService from "../services/contentService";

export const safeParse = (str) => {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

export const getSetting = (settings, key) => {
  if (!Array.isArray(settings) || !key) return "";
  const match = settings.find(
    (s) =>
      s.setting_key?.toLowerCase() === key.toLowerCase() ||
      s.key?.toLowerCase() === key.toLowerCase()
  );
  return match?.setting_value ?? match?.value ?? "";
};

export const getSection = (sections, title) => {
  if (!Array.isArray(sections) || !title) return "";
  const match = sections.find(
    (s) => s.section_title?.toLowerCase() === title.toLowerCase()
  );
  return match?.content || "";
};

export const useContentData = (pageTypeFilter = null) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, sectionsRes] = await Promise.all([
          contentService.getSettings(),
          contentService.getLegalPageSections(),
        ]);
        const apiSettings = settingsRes.data?.data || settingsRes.data || [];
        const allSections = sectionsRes.data?.data || sectionsRes.data || [];
        const filteredSections =
          Array.isArray(pageTypeFilter) && pageTypeFilter.length > 0
            ? allSections.filter((s) =>
                pageTypeFilter.some((t) =>
                  s.page_type?.toLowerCase().includes(t.toLowerCase())
                )
              )
            : allSections;
        setSettings(apiSettings);
        setSections(filteredSections);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageTypeFilter]);

  return { loading, settings, sections };
};

export const useSubcategorySettings = (slug) => {
  const { settings, loading } = useContentData();
  const key = (suffix) =>
    `subcategory_${slug.toLowerCase().replace(/\s+/g, "_")}_${suffix}`;
  const s = (suffix) => getSetting(settings, key(suffix));
  return { settings, loading, s, key };
};

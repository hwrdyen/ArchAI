export interface MockProject {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

export const MOCK_PROJECTS: MockProject[] = [
  { id: "1", name: "E-commerce Platform", slug: "e-commerce-platform", owned: true },
  { id: "2", name: "Real-time Chat App", slug: "real-time-chat-app", owned: true },
  { id: "3", name: "Analytics Dashboard", slug: "analytics-dashboard", owned: false },
];

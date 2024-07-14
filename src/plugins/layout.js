import { layouts } from 'src/layouts/layouts';

export function useLayout(app) {
  for (const layout in layouts) {
    app.component(layout, layouts[layout]);
  }
}

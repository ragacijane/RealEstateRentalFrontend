<script lang="ts">
  import { provideAdminContext } from '@/contexts/adminContext';
import { fetchProperties } from '@/services/adminService';
import { defineComponent, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'AdminProvider',
    setup() {
      const {
        setAllProperties
      } = provideAdminContext();
      
      onMounted(async () => {
        try {
          const [allProperties] = await Promise.all([
            fetchProperties()
          ]);
          setAllProperties(allProperties);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });
    },
  });
  </script>
  
  <template>
    <div>
      <slot></slot>
    </div>
  </template>
  
  
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { fetchTags, fetchEquipment, fetchTypes, fetchBoroughs, fetchStructures } from '@/services/dataService';
import { provideDataContext } from '@/contexts/DataContext';
  
  export default defineComponent({
    name: 'DataTableProvider',
    setup() {
      const {
        setAllTags,
        setAllEquips,
        setAllTypes,
        setAllBoroughs,
        setAllStructures
      } = provideDataContext();
      
      onMounted(async () => {
        try {
          const [tags, equipment, types, boroughs, structures] = await Promise.all([
            fetchTags(),
            fetchEquipment(),
            fetchTypes(),
            fetchBoroughs(),
            fetchStructures(),
          ]);
          setAllTags(tags);
          setAllEquips(equipment);
          setAllTypes(types);
          setAllBoroughs(boroughs);
          setAllStructures(structures);
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
  
  
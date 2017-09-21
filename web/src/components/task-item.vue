<template>
  <ul class="task-item scrum-stage-tasks" :class="'scrum-stage-tasks-' + target">
    <li v-for="task in tasks" class="task task-card" :class="task.isDone ? 'done' : 'ui-sortable-handle'">
      <div class="task-priority-wrapper priority-wrap">
        <div class="task-priority" :class="'bg-priority-' + task.priority"></div>
      </div>
      <a class="check-box"><span class="icon icon-tick"></span></a>
      <div class="task-content-set open-detail" data-type="task">
        <div class="task-content-wrapper">
          <div class="task-content">{{task.name}}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
    export default {
      name: "task-item",
      props: ['tasks', 'target']
    }
</script>

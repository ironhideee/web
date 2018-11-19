import { autoserialize } from 'cerialize';

export class IncorpStep {
    @autoserialize
    id: string;

    /**
     * Index of the step in the whole process.
     */
    index: number;

    @autoserialize
    description: string;

    /**
     * If it's activated, user should be currently in this step.
     */
    activated = false;

    /**
     * If it's enabled, user should be able to navigate to this step
     */
    enabled = false;

    @autoserialize
    url = '';

    constructor(idx: number, id: string, desc: string, url: string) {
        this.index = idx;
        this.id = id;
        this.description = desc;
        this.url = url;
    }

    static of(idx: number, id: string, desc: string, url: string) {
        return new IncorpStep(idx, id, desc, url);
    }
}
